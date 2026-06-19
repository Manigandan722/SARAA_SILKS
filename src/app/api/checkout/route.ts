import { NextResponse } from 'next/server';
import { createShiprocketOrder, type ShiprocketOrderPayload } from '@/lib/shiprocket';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const PICKUP_LOCATION = process.env.SHIPROCKET_PICKUP_LOCATION || 'Coimbatore Warehouse';

type CheckoutItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CheckoutRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  items?: CheckoutItem[];
  total?: number;
  paymentMethod?: 'COD' | 'Prepaid';
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateCheckout(body: CheckoutRequest) {
  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const email = clean(body.email);
  const phone = clean(body.phone).replace(/\D/g, '');
  const address = clean(body.address);
  const address2 = clean(body.address2);
  const city = clean(body.city);
  const state = clean(body.state);
  const pincode = clean(body.pincode).replace(/\D/g, '');
  const paymentMethod: 'COD' | 'Prepaid' = body.paymentMethod === 'Prepaid' ? 'Prepaid' : 'COD';

  if (!firstName || !email || !phone || !address || !city || !state || !pincode) {
    throw new Error('Please fill all required checkout fields.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (phone.length < 10 || phone.length > 12) {
    throw new Error('Please enter a valid phone number.');
  }

  if (pincode.length !== 6) {
    throw new Error('Please enter a valid 6 digit pincode.');
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw new Error('Cart is empty.');
  }

  const items = body.items.map((item) => ({
    id: clean(item.id),
    title: clean(item.title),
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));

  if (items.some((item) => !item.id || !item.title || item.price <= 0 || item.quantity < 1)) {
    throw new Error('Cart contains an invalid item.');
  }

  const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const submittedTotal = Number(body.total);

  if (!Number.isFinite(submittedTotal) || Math.abs(calculatedTotal - submittedTotal) > 0.01) {
    throw new Error('Cart total does not match checkout items.');
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    address,
    address2,
    city,
    state,
    pincode,
    items,
    total: calculatedTotal,
    paymentMethod,
  };
}

function createOrderReference() {
  return `SARAA-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function currentShiprocketDate() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

export async function POST(request: Request) {
  try {
    const checkout = validateCheckout((await request.json()) as CheckoutRequest);
    const customerName = `${checkout.firstName} ${checkout.lastName}`.trim();
    const internalOrderId = createOrderReference();

    const shiprocketPayload: ShiprocketOrderPayload = {
      order_id: internalOrderId,
      order_date: currentShiprocketDate(),
      pickup_location: PICKUP_LOCATION,
      billing_customer_name: checkout.firstName,
      billing_last_name: checkout.lastName,
      billing_address: checkout.address,
      billing_address_2: checkout.address2,
      billing_city: checkout.city,
      billing_pincode: checkout.pincode,
      billing_state: checkout.state,
      billing_country: 'India',
      billing_email: checkout.email,
      billing_phone: checkout.phone,
      shipping_is_billing: true,
      order_items: checkout.items.map((item) => ({
        name: item.title,
        sku: item.id.slice(0, 30),
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: checkout.paymentMethod,
      sub_total: checkout.total,
      length: 12,
      breadth: 12,
      height: 8,
      weight: 0.8,
    };

    console.log('[Checkout] Creating Shiprocket order:', internalOrderId);
    const shiprocketResponse = await createShiprocketOrder(shiprocketPayload);

    const shiprocketOrderId = shiprocketResponse.order_id || internalOrderId;
    const shiprocketShipmentId = shiprocketResponse.shipment_id || '';
    const awbCode = shiprocketResponse.awb_code || shiprocketResponse.awb || '';

    console.log('[Checkout] Shiprocket order created:', {
      shiprocketOrderId,
      shiprocketShipmentId,
      awbCode,
    });

    console.log('[Checkout] Saving order to Strapi...');
    const strapiRes = await fetch(`${STRAPI_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          customerName,
          phone: checkout.phone,
          address: checkout.address2
            ? `${checkout.address}, ${checkout.address2} (Email: ${checkout.email})`
            : `${checkout.address} (Email: ${checkout.email})`,
          city: checkout.city,
          state: checkout.state,
          pincode: checkout.pincode,
          items: checkout.items,
          total: checkout.total,
          paymentMethod: checkout.paymentMethod,
          shiprocketOrderId: String(shiprocketOrderId),
          shiprocketShipmentId: String(shiprocketShipmentId),
          awbCode: String(awbCode),
          status: 'pending',
        },
      }),
    });

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text();
      throw new Error(`Failed to save order in Strapi: ${errorText}`);
    }

    const strapiData = await strapiRes.json();
    const strapiDocumentId = strapiData.data?.documentId || strapiData.data?.id || internalOrderId;

    console.log('[Checkout] Order saved in Strapi. ID:', strapiDocumentId);

    return NextResponse.json({
      success: true,
      orderId: strapiDocumentId,
      shiprocketOrderId: String(shiprocketOrderId),
      shipmentId: String(shiprocketShipmentId),
      awbCode: String(awbCode),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    const status = message.includes('Shiprocket') || message.includes('Strapi') ? 502 : 400;

    console.error('[Checkout] Error:', message);

    return NextResponse.json({ success: false, error: message }, { status });
  }
}

import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      total,
      paymentMethod = 'Prepaid'
    } = body;

    const customerName = `${firstName} ${lastName}`;

    console.log('--- MOCKING SHIPROCKET ORDER CREATION API ---');
    console.log('Endpoint: https://apiv2.shiprocket.in/v1/external/orders/create/adhoc');
    console.log('Sending payload to Shiprocket...');
    
    // Simulate Shiprocket adhoc order request payload
    const shiprocketPayload = {
      order_id: 'SARAA-' + Math.floor(Math.random() * 1000000),
      order_date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pickup_location: 'Coimbatore Warehouse',
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: address,
      billing_city: city,
      billing_pincode: pincode,
      billing_state: state,
      billing_country: 'India',
      billing_email: email,
      billing_phone: phone,
      shipping_is_billing: true,
      order_items: items.map((item: any) => ({
        name: item.title,
        sku: item.id.substring(0, 8),
        units: item.quantity,
        selling_price: item.price
      })),
      payment_method: paymentMethod,
      sub_total: total,
      length: 12,
      breadth: 12,
      height: 8,
      weight: 0.8
    };

    console.log('Shiprocket Payload:', JSON.stringify(shiprocketPayload, null, 2));

    // Simulate Shiprocket network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock successful response from Shiprocket
    const mockShiprocketResponse = {
      order_id: shiprocketPayload.order_id,
      shipment_id: 100000 + Math.floor(Math.random() * 900000),
      awb_code: 'AWB' + Math.floor(Math.random() * 10000000000),
      status: 'NEW',
      status_code: 1
    };
    
    console.log('Shiprocket Response:', JSON.stringify(mockShiprocketResponse, null, 2));
    const shiprocketOrderId = mockShiprocketResponse.order_id;

    // Save the order to Strapi
    console.log('Saving order to Strapi Database...');
    const strapiRes = await fetch(`${STRAPI_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          customerName,
          phone,
          address: `${address} (Email: ${email})`,
          city,
          state,
          pincode,
          items, // Save items JSON
          total,
          paymentMethod,
          shiprocketOrderId,
          status: 'pending'
        }
      })
    });

    if (!strapiRes.ok) {
      const errorText = await strapiRes.text();
      throw new Error(`Failed to save order in Strapi: ${errorText}`);
    }

    const strapiData = await strapiRes.json();
    const strapiOrderId = strapiData.data.documentId || strapiData.data.id;
    console.log(`Order saved successfully in Strapi. Document ID: ${strapiOrderId}`);

    return NextResponse.json({
      success: true,
      orderId: strapiOrderId,
      shiprocketOrderId,
      shipmentId: mockShiprocketResponse.shipment_id,
      awbCode: mockShiprocketResponse.awb_code
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}

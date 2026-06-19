const SHIPROCKET_BASE_URL =
  process.env.SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in/v1/external';

const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL || '';
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD || '';

const PLACEHOLDER_EMAIL = 'your_shiprocket_api_email@example.com';
const PLACEHOLDER_PASSWORD = 'your_shiprocket_api_password';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

type ShiprocketErrorPayload = {
  message?: string;
  errors?: unknown;
};

export type ShiprocketOrderItem = {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
};

export type ShiprocketOrderPayload = {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: 'India';
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: ShiprocketOrderItem[];
  payment_method: 'COD' | 'Prepaid';
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
};

export type ShiprocketOrderResponse = {
  order_id?: string | number;
  shipment_id?: string | number;
  awb_code?: string;
  awb?: string;
  status?: string;
  status_code?: number;
  message?: string;
};

function assertShiprocketCredentials() {
  if (
    !SHIPROCKET_EMAIL ||
    !SHIPROCKET_PASSWORD ||
    SHIPROCKET_EMAIL === PLACEHOLDER_EMAIL ||
    SHIPROCKET_PASSWORD === PLACEHOLDER_PASSWORD
  ) {
    throw new Error(
      'Shiprocket API credentials are missing. Set SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD in .env.local.'
    );
  }
}

async function parseShiprocketResponse(res: Response) {
  const text = await res.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function formatShiprocketError(status: number, payload: ShiprocketErrorPayload) {
  if (payload.message) {
    return payload.message;
  }

  if (payload.errors) {
    return JSON.stringify(payload.errors);
  }

  return `Shiprocket request failed with status ${status}`;
}

export async function getShiprocketToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt - 30 * 60 * 1000) {
    return cachedToken;
  }

  assertShiprocketCredentials();

  const res = await fetch(`${SHIPROCKET_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: SHIPROCKET_EMAIL,
      password: SHIPROCKET_PASSWORD,
    }),
  });

  const data = (await parseShiprocketResponse(res)) as { token?: string } & ShiprocketErrorPayload;

  if (!res.ok || !data.token) {
    throw new Error(`Shiprocket authentication failed: ${formatShiprocketError(res.status, data)}`);
  }

  cachedToken = data.token;
  tokenExpiresAt = now + 240 * 60 * 60 * 1000;

  return cachedToken;
}

export async function createShiprocketOrder(payload: ShiprocketOrderPayload) {
  const token = await getShiprocketToken();

  const res = await fetch(`${SHIPROCKET_BASE_URL}/orders/create/adhoc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = (await parseShiprocketResponse(res)) as ShiprocketOrderResponse & ShiprocketErrorPayload;

  if (!res.ok) {
    throw new Error(`Shiprocket order creation failed: ${formatShiprocketError(res.status, data)}`);
  }

  return data;
}

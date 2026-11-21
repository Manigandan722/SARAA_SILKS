import { NextResponse } from 'next/server';
import { WHATSAPP_NUMBER } from '@/data/products';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = `SARAA-${Date.now().toString().slice(-6)}`;
    
    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order processed successfully',
      whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process checkout request' },
      { status: 400 }
    );
  }
}

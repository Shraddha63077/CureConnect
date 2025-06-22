import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function testRazorpayConnection() {
  try {
    const options = {
      amount: 100, // 1 INR in paise
      currency: process.env.CURRENCY || 'INR',
      receipt: 'test_receipt_001',
    };
    console.log('Creating test order with options:', options);
    const order = await razorpayInstance.orders.create(options);
    console.log('Test order created successfully:', order);
  } catch (error) {
    console.error('Error creating test order:', error);
  }
}

testRazorpayConnection();

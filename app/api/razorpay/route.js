import { NextRequest, NextResponse } from 'next/server'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import Payment from '@/models/Payments'
import Razorpay from 'razorpay'
import connectDb from '@/db/connectDb'
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)
    // console.log(body);

    // check if razorpay id is present in the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found" })
    }

    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    // verify the payment
    let x = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret)

    if (x) {
        if (!body.razorpay_payment_id || !body.razorpay_signature) {
            return NextResponse.json({ success: false, message: "Incomplete or cancelled payment" });
        }

        // update the payment status
        const updatePayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        console.log('Updated Payment:', updatePayment);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/${updatePayment.to_user}?paymentdone=true`)
    }
    else {
        console.warn('❌ Payment verification failed. Signature mismatch.');
        return NextResponse.json({ success: false, message: "Payment verification failed" });
    }

}



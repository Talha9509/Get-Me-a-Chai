"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/app/actions/useraction'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession();

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
        // console.log(paymentform);
    }

    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcuurentUser] = useState({})
    const [payemnts, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
    }, [])


    const getData = async () => {
        let u = await fetchuser(username)
        setcuurentUser(u)
        let dbpayements = await fetchpayments(username)
        setPayments(dbpayements)
        console.log(u, dbpayements);
    }

    const pay = async (amount) => {
        if (!paymentform.name) {
            toast('Please enter your name before making a payment.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        console.log(paymentform.name);
        // get the order id
        let a = await initiate(amount, username, paymentform)
        // console.log(session.user.name);
        let orderId = a.id

        var options = {
            // "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover w-full bg-red-50 relative'>
                <img className='object-cover object-top w-full md:h-[40vh] h-[25vh] border-b-1 border-t-1' src={currentUser.coverpic} alt="cover" />
                <div className='absolute md:right-[44%] md:top-40 top-35 right-[28vw] border-2 h-40 w-40 flex overflow-hidden border-white rounded-full'>
                    <img width={200} height={200} className='object-cover' src={currentUser.profilepic} alt="profile" />
                </div>
            </div>

            <div className="info flex justify-center items-center my-26 mb-32 flex-col gap-2">
                <div className='font-bold text-lg'>{/* @{params.username} */}@{username}</div>
                <div className='text-slate-300'>Let&apos;s help {username} get a chai!</div>
                <div className='text-slate-300'>
                    {payemnts.length} Payments Received
                </div>
                <div className='text-slate-300'>₹{payemnts.reduce((sum, paymentt) => sum + Number(paymentt.amount || 0), 0)} has been raised</div>


                <div className="payment flex md:flex-row flex-col gap-3 w-[90%] 2xl:w-[80%]  mt-10  ">
                    <div className="supporters  bg-slate-900 rounded-lg text-white md:p-10 p-5 pb-10 md:pb-0 w-full md:w-[60%]
                         order-2 md:order-1">
                        {/* Show list of all the supporters as a leaderboard */}
                        <h2 className='text-2xl font-bold my-5 text-center'>Supporters</h2>
                        <ul className='mx-2 2xl:text-lg text-md'>
                            {payemnts.length === 0 && <div className='flex items-center justify-center h-60 font-bold text-lg'>No payments yet</div>}
                            {payemnts.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-2 items-center'>
                                    <img width={33} src="avatar.gif" alt="user avator" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &ldquo;{p.message}&rdquo;;
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>


                    <div className="makePayment w-full md:w-[40%] bg-slate-900 rounded-lg text-white md:p-10 p-5 order-1 md:order-2 ">
                        <h2 className='text-2xl font-bold md:my-5 my-2 text-center'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col items-center'>
                            
                                <input onChange={handleChange} value={paymentform.name || ""} name='name' type="text" className='md:w-full w-[95%] md:py-3 py-2 px-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            
                            <input onChange={handleChange} value={paymentform.message || ""} name='message' type="text" className='md:w-full w-[95%] md:py-3 py-2 px-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount || ""} name='amount' type="text" className='md:w-full w-[95%] md:py-3 py-2 px-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} type="button" className="md:w-full w-3/5  text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:px-5 px-3 md:py-2.5 py-2  text-center me-2 mb-2  disabled:from-purple-500" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 2 || paymentform.amount?.length < 1}>Pay</button>
                        </div>
                        <div className='flex gap-2 md:mt-5 mt-2  justify-center'>
                            <button className='bg-slate-800 md:px-3 md:py-3 px-3 py-2 rounded-lg' onClick={() => { pay(Number.parseInt(100) * 100) }}>Pay ₹100</button>
                            <button className='bg-slate-800 md:px-3 md:py-3 px-3 py-2 rounded-lg' onClick={() => { pay(Number.parseInt(200) * 100) }}>Pay ₹200</button>
                            <button className='bg-slate-800 md:px-3 md:py-3 px-3 py-2 rounded-lg' onClick={() => { pay(Number.parseInt(300) * 100) }}>Pay ₹300</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage

"use server"
import React from 'react'
import Razorpay from 'razorpay'
import Payment from '@/models/Payments'
import User from '@/models/User'
import connectDB from '@/db/connectDb'
import username from '../[username]/page'


export const initiate = async (amount, to_username, paymentform) => {
  await connectDB()

  // fetch the secret of the user who is getting the payment 
  let user = await User.findOne({username: to_username})
  const secret = user.razorpaysecret
  var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

  instance.orders.create({
    amount: 50000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2"
    }
  })

  let options = {
    amount: Number.parseInt(amount),
    currency:"INR"
  }

  let x= await instance.orders.create(options)

  // create a payment object which shows a pending payment in the database
  await Payment.create({oid:x.id, amount: amount/100,to_user: to_username, name: paymentform.name, message:paymentform.message })

  return x
}

export const fetchuser=async (username)=>{
  await connectDB()
  console.log(username);
  let u=await User.findOne({username:username})
  let user=u.toObject({flattenObjectIds:true})
  return user 
}

export const fetchpayments=async (username)=>{
  await connectDB()

  // find all payments sorted by decreasing order of amount and flatten object ids
  let p= await Payment.find({to_user:username, done:true}).sort({amount:-1}).limit(6).lean()
  // return p 
  return p.map(payment => ({
    ...payment,
    _id: payment._id.toString(),              
    createdAt: payment.createdAt.toISOString(), // optional, for consistency
    updatedAt: payment.updatedAt.toISOString(), // optional, for consistency
  }))
}



export const updateProfile=async(data,oldusername)=>{
  await connectDB()
  let ndata=Object.fromEntries(data)

  // if username is being updated, check if username is available
  if(oldusername!==ndata.username){
    let u=await User.findOne({username:ndata.username})
    if(u){
      return {error:"username already exists"}
    }
    await User.updateOne({email:ndata.email},ndata)
    // now update all the usernames in payment table
    await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
  }

  await User.updateOne({email:ndata.email},ndata)

}
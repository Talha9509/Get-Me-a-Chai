"use client"
import React,{useEffect} from 'react'
import PaymentPage from '@/components/PaymentPage'
import { useRouter } from 'next/navigation';
import {useSession} from 'next-auth/react'

const Username = ({ params }) => {
   const router = useRouter()
  const { data: session,status } = useSession()

   useEffect(()=>{
    if(status === "unauthenticated"){
      router.push("/login")
    }
   },[status,router])
  
  return <PaymentPage username={params.username}/>
  
}


export default Username


 
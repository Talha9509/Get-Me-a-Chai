"use client"
import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { useRouter } from 'next/navigation';
import {useSession} from 'next-auth/react'
import {useEffect} from 'react'

const username = ({ params }) => {
   const unwrappedParams = React.use(params);
   const router = useRouter()
  const { data: session,status } = useSession()

   useEffect(()=>{
    if(status === "unauthenticated"){
      router.push("/login")
    }
   },[status,router])
  
  return (
    <>
      <PaymentPage username={unwrappedParams.username}/>
    </>
  )
}


export default username


 
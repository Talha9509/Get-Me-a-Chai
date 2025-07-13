"use client"
import React, { useState, useEffect,useRef } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

   


    return (
        <nav
            // className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row' 
            className={`bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 min-h-14 ${session ? 'flex-col md:flex-row' : 'flex-row'}`} >
            <Link href={"/"}>
                <div className="logo font-bold text-lg flex items-center justify-center">
                    <img className='invertImg' src="tea.gif" width={44} alt="" />
                    <span>GetMeaChai!</span>
                </div>
            </Link>

            <div className='relative'>
                {session && <><button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => { setTimeout(() => { setShowdropdown(false) }, 400); }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white  md:mx-4 mx-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 md:py-2.5 px-2 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                </button>


                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-20 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            {/* <li>
                                <Link href="/dashboard"  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li> */}
                            <li>
                                <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                            </li>
                            {/* <li>
                                <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                            </li> */}
                            <li>
                                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </>
                }

                {session && <Link href={"/dashboard"}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:px-5 md:py-2.5 px-2 py-1 text-center me-2 mb-2 mt-2 md:mt-0 ml-[25vw] md:ml-0">Dashboard</button></Link>}

                {session && <button type="button" onClick={() => signOut()} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:px-5 md:py-2.5 px-2 py-1 text-center me-2 mb-2 mt-2 md:mt-0 mr-[25vw] md:mr-0 ">Logout</button>}

                {!session && <Link href={"/login"}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:px-5 md:py-2.5 px-2 py-1 text-center me-2 mb-2">Login</button></Link>}
            </div>

        </nav>
    )
}

export default Navbar








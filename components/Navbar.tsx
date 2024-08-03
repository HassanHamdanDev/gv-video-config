import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
            <Link href='/' className='text-white flex items-center gap-1'>
                <Image src='/icons/logo.svg' alt='Guav logo' width={42} height={42} className='max-sm:size-10' />
                <p className='text-[30px] font-extrabold text-white max-sm:hidden'>Guav</p>
            </Link>
            <div className="flex-between gap-5">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <MobileNav />
            </div>
        </nav>
    )
}

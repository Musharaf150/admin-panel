'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link className='mb-12
            cursor-pointer flex
            items-center gap-2' href='/'>

                <Image src="/icons/logo.png"
                alt='logo' width={54} height={54}
                className='size-12
                max-xl:size-16'/>
                <h1 className='sidebar-logo'>
                    Hope
                </h1>
            </Link>
            {sidebarLinks.map((item)=> {
                const isActive = pathname === item.route ||
                pathname.startsWith(`${item.route}/`)

                return(
                    <Link 
                    href={item.route}
                    key={item.label}
                    className={cn('sidebar-link',
                        {
                            'bg-bank-gradient' : isActive
                        }
                    )}>
                    <div className='relative size-6'>
                        <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({'brightness-[3] invert-0': isActive})}/>
                    </div>
                    <p className={cn('sidebar-label',{
                        '!text-white' : isActive
                    })}>
                        {item.label}
                    </p>
                </Link>
                )
            })}
        </nav>

        <div>
        <SignedIn>
            <UserButton />
            <p className='font-bold text-xl text-gray-950 -mt-8 ml-10'>Admin</p>
          </SignedIn>
        </div>
    </section>
  )
}

export default SideBar
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { HeaderCartProps } from '@/types'
import Link from 'next/link'

const Headercart = ({btnTitle,cls}:HeaderCartProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Search" className='rounded-lg' />
        <Button type="submit" variant="outline" className='font-semibold px-6 rounded-md'>Search</Button>
      </div>
      <div>
        <Link href={cls}>
        <Button variant="outline" className="px-10 font-semibold">
          {btnTitle}
        </Button></Link>
      </div>
    </div>
  )
}

export default Headercart
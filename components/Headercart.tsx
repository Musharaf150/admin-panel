import React from 'react'
import { Button } from './ui/button'
import { HeaderCartProps } from '@/types'
import Link from 'next/link'
import Search from './Search'
import CategoryFilter from './CategoryFilter'

const Headercart = ({btnTitle,cls}:HeaderCartProps) => {
  return (
      <div>
        <Link href={cls}>
        <Button variant="outline" className="px-10 font-semibold">
          {btnTitle}
        </Button></Link>
      </div>
    
  )
}

export default Headercart
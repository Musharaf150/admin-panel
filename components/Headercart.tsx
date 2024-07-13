import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Headercart = ({btnTitle}:HeaderCartProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="search" placeholder="Search" />
        <Button type="submit" variant="outline" className='font-semibold px-6'>Search</Button>
      </div>
      <div>
        <Button variant="outline" className="px-10 font-semibold">
          {btnTitle}
        </Button>
      </div>
    </div>
  )
}

export default Headercart
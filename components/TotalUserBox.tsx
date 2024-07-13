import Image from 'next/image'
import React from 'react'

const TotalUserBox = ({totalCurrentUsers}:TotalUsersCountProps) => {
  return (
    <section className='total-balance'>
    <div className='flex flex-col gap-2'>
        <Image src="/icons/group.png"
                alt='logo' width={75} height={85}
               />
            <p className='total-balance-amount flex-center gap-2'>
                {totalCurrentUsers}
            </p>
    </div>
</section> 
  )
}

export default TotalUserBox
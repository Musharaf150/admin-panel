import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { ICompaign } from '@/lib/database/models/compaign.model'
import { Button } from './ui/button'
import { ComDeleteConfirmation } from './ComDeleteConfirmation'

type CardProps = {
  compaign: ICompaign,
  hasOrderLink?: boolean,
}

const Card = ({ compaign, hasOrderLink}: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isCompaignCreator = userId === compaign.organizer._id.toString();


  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
          <div className="relative">
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">URGENT</div>
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">{compaign.isZakatEligible ? 'Zakat Eligible' : `Zakat Eligible`}</div>
          </div>
     
      <Link 
        href={`/compaigns/${compaign._id}`}
        style={{backgroundImage: `url(${compaign.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 h-72"
      />
        

        {/* IS COMPAIGN CREATOR */}
        {isCompaignCreator && (
           <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
           <Link href={`/compaigns/${compaign._id}/update`}>
             <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
           </Link>
 
           <ComDeleteConfirmation compaignId={compaign._id} />
         </div>
        )}
      

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
      <div className="flex gap-2">
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {compaign.comCategory.name}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(compaign.endDateTime).dateTime}
        </p>
    
        </div>

        

        <Link href={`/compaigns/${compaign._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{compaign.title}</p>
        </Link>

              <div className="mt-1">
                  <div className="flex items-center justify-between text-sm">
                      <span>Rs. {compaign.goal}</span>
                      <span className="text-gray-600">Required</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                      <span>Rs. 2,528,449</span>
                      <span className="text-gray-600">Raised</span>
                  </div>

              </div>

        <div className="flex-between w-full">
          {/* <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {compaign.organizer.firstName} {compaign.organizer.lastName}

          </p>  */}
          <Button size="lg" asChild className="button w-full">
            <Link href="/">
            Donate Now
            </Link>
          </Button>

          {!hasOrderLink && (
            <Link href={`/compaign?compaignId=${compaign._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card

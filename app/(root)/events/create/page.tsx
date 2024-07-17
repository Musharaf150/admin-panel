import EventForm from '@/components/EventForm'
import HeaderBox from '@/components/HeaderBox'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const CreateEvent = () => {
    const {sessionClaims} = auth();

    const userId = sessionClaims?.userId as string;

    console.log(userId)


  return (
    <section className='home'>
    <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
        title='Create Event'/>
      </header>
      
 
    </div>
    <div className='px-5 sm:px-8 py-7 lg:py-12'>
        <EventForm userId={userId} type="Create"/>
    </div>
   
  </section>
  )
}

export default CreateEvent

import EventForm from "@/components/EventForm"
import HeaderBox from "@/components/HeaderBox"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id)

  return (
    <>
      <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Update Event'/>
        </header>
        
      </div>

      <div className="wrapper px-5 sm:px-8  lg:py-12">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} 
        />
      </div>
     
    </section>
    </>
  )
}

export default UpdateEvent
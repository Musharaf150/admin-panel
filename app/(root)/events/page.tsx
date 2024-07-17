import Collection from '@/components/Collection';
import HeaderBox from '@/components/HeaderBox';
import Headercart from '@/components/Headercart';
import { getAllEvents } from '@/lib/actions/event.actions';

const Events = async () => {
  const events = await getAllEvents({
    query:'',
    category: '',
    page: 1,
    limit: 6
  });

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Events'/>
        </header>
        <Headercart btnTitle="Create Event" cls='/events/create'/>
        
   
      </div>

      <Collection
      data={events?.data} 
      emptyTitle = "No Events Founds"
      emptyStateSubtext="Come Back Later"
      collectionType="All_Events"
      limit={3}
      page={1}
      totalPages={2}/>
     
    </section>
  )
}

export default Events
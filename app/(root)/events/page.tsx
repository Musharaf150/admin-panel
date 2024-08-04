import CategoryFilter from '@/components/CategoryFilter';
import Collection from '@/components/Collection';
import HeaderBox from '@/components/HeaderBox';
import Headercart from '@/components/Headercart';
import Search from '@/components/Search';
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';

const Events = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const eventsearchText = (searchParams?.query as string) ||" ";
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query:eventsearchText,
    category,
    page,
    limit: 6
  });

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Events'/>
        </header>
        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:w-3/4">
            <Search />
            <CategoryFilter />
          </div>
          <Headercart btnTitle="Create Event" cls='/events/create' />

        </div>        
   
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
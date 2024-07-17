import CompaignsCollection from '@/components/CompaignsCollection'
import HeaderBox from '@/components/HeaderBox'
import Headercart from '@/components/Headercart'
import { getAllCompaigns } from '@/lib/actions/compaign.action';


const page = async () => {
  const compaigns = await getAllCompaigns({
    query:'',
    comCategory: '',
    page:1,
    limit: 6,
  });


  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Compaigns'/>
        </header>
        <Headercart btnTitle='Create Compaigns' cls='/compaigns/create'/>
      </div>

      <CompaignsCollection
          data={compaigns?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Compaigns"
          limit={6}
          page={2}
          totalPages={compaigns?.totalPages}
        />
     
    </section>
  )
}

export default page
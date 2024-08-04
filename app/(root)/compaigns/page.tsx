import ComCategoryFilter from '@/components/ComCategoryFilter';
import CompaignsCollection from '@/components/CompaignsCollection'
import HeaderBox from '@/components/HeaderBox'
import Headercart from '@/components/Headercart'
import Search from '@/components/Search';
import { getAllCompaigns } from '@/lib/actions/compaign.action';
import { SearchParamProps } from '@/types';


const page = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const compaignsearchText = (searchParams?.query as string) ||" ";
  const comCategory = (searchParams?.comCategory as string) || '';

  const compaigns = await getAllCompaigns({
    query:compaignsearchText,
    comCategory,
    page,
    limit: 6
  });


  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Compaigns'/>
        </header>

        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col gap-3 md:flex-row md:w-3/4">
            <Search />
            <ComCategoryFilter />
          </div>
          <Headercart btnTitle='Create Compaigns' cls='/compaigns/create'/>
        </div>
      </div>

      <CompaignsCollection
          data={compaigns?.data}
          emptyTitle="No Campaigns Found"
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
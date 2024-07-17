import CompaignForm from "@/components/CompaignForm"
import HeaderBox from "@/components/HeaderBox"
import { getCompaignById } from "@/lib/actions/compaign.action"
import { auth } from "@clerk/nextjs/server"


type UpdateCompaignProps = {
  params: {
    id: string
  }
}


const UpdateCompaign = async ({ params: { id } }: UpdateCompaignProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    const compaign = await getCompaignById(id)

  return (
    <section className='home'>
    <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
        title='Update Compaign'/>
      </header>
      
 
    </div>
    <div className='px-5 sm:px-8 py-7 lg:py-12'>
        <CompaignForm 
        userId={userId} 
        type='Update'
        compaign={compaign}
        compaignId={compaign._id}/>
    </div>
   
  </section>
  )
}

export default UpdateCompaign

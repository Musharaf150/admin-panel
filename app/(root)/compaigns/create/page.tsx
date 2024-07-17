import CompaignForm from "@/components/CompaignForm"
import HeaderBox from "@/components/HeaderBox"
import { auth } from "@clerk/nextjs/server"


const CreateCompaign = () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;

    


  return (
    <section className='home'>
    <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
        title='Create Compaign'/>
      </header>
      
 
    </div>
    <div className='px-5 sm:px-8 py-7 lg:py-12'>
        <CompaignForm userId={userId} type='Create'/>
    </div>
   
  </section>
  )
}

export default CreateCompaign

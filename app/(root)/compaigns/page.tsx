import HeaderBox from '@/components/HeaderBox'
import Headercart from '@/components/Headercart'


const page = () => {
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Compaigns'/>
        </header>
        <Headercart btnTitle='Create Compaigns'/>
      </div>
     
    </section>
  )
}

export default page
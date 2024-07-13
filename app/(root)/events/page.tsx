import HeaderBox from '@/components/HeaderBox';
import Headercart from '@/components/Headercart';

const Events = () => {
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Events'/>
        </header>
        <Headercart btnTitle="Create Event"/>
   
      </div>
     
    </section>
  )
}

export default Events
import DashboardHeader from '@/components/DashboardHeader'
import DashboardHero from '@/components/DashboardHero'
import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const Home = () => {
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          title='Dashboard'/>

          <DashboardHeader/>
        </header>
        <DashboardHero/>
      </div>
    </section>
  )
}

export default Home

import DashboardChart from "./DashboardChart"
import HeaderBox from "./HeaderBox"


const DashboardHero = () => {
  return (
    <section className="">
      <HeaderBox title="Overview"/>
        <div className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 mt-4">
        <DashboardChart/>
        </div>
    </section>
  )
}

export default DashboardHero 
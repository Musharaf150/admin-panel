import CompaignsChart from "./CompaignsChart"
import DashboardChart from "./DashboardChart"


const DashboardHero = () => {
  return (
    <section className="grid grid-cols-2 gap-2">
        <DashboardChart/>
        <CompaignsChart/>
    </section>
  )
}

export default DashboardHero
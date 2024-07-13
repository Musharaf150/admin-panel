import { HeaderBoxProps } from "@/types"

const HeaderBox = ({title}:HeaderBoxProps) => {
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
        </h1>
    </div>
  )
}

export default HeaderBox
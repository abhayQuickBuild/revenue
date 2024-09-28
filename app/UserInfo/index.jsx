'use client'
import { Breadcrumb, Typography } from "antd";
import { usePathname } from "next/navigation";
import ProfileIcon from "../../ProfileIcon"

const {Title, Text} = Typography;

const pageHeading = {
    "/":"Main Dashboard",
    "/ai":"AI Intelligence"
}

const breadcrumbsItems = {
    "/":[{title:"Pages"},{title:"Dashboard"}],
    "/ai":[{title:"Pages"}, {title:"Ai"}]
}
const UserInfo = ({name})=>{
    const pathname = usePathname();
    return <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
        <Breadcrumb style={{fontSize:"14px"}} items={breadcrumbsItems[pathname]}/>
            <Title level={4}>{pageHeading[pathname]}</Title>
         
           
        </div>
        <div>
            <div style={{fontWeight:"700", fontSize:"24px", color:"#2B3674", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div style={{marginRight:"10px", paddingTop:"10px"}}><ProfileIcon/></div> {name}</div>
            <div style={{fontWeight:"500", fontSize:"14px", color:"#AFB4BF", textAlign:"end"}} >Superadmin</div>
        </div>
    </div>
}

export default UserInfo;
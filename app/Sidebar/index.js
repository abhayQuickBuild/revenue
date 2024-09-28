'use client'
import {
    DesktopOutlined,
  
  } from '@ant-design/icons';
  import {  Layout, Menu, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import UserInfo from '../UserInfo';
import {useRouter, usePathname} from "next/navigation";
import HomeIcon from "../../HomeIcon";
import AiIcon from "../../AiIcon"
import { fetchUserDetail } from '../apiUtils';
import {getCookie, setCookie} from "../apiUtils/cookie"
  const { Header, Content, Footer, Sider } = Layout;
  const {Title, Text} = Typography;
  
  
  const useCookieChange = (cookieName) => {
    const [cookieValue, setCookieValue] = useState(getCookie(cookieName));
  
    useEffect(() => {
      const interval = setInterval(() => {
        const newCookieValue = getCookie(cookieName);
        if (newCookieValue !== cookieValue) {
          setCookieValue(newCookieValue);  // Re-render if cookie changes
        }
      }, 1000);  // Check cookie every second
  
      return () => clearInterval(interval);
    }, [cookieValue, cookieName]);
  
    return cookieValue;
  };
  
  const Sidebar = ({children})=>{
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("1")
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  const router = useRouter();
  const pathname = usePathname()
  const cookie = useCookieChange("tenantName");
  console.log("cookie",cookie)
  const [userData, setUserData] = useState(null);
  const getUserData = async ()=>{
    const data = await fetchUserDetail();
    if(data?.token){
      setCookie("token", `Bearer ${data?.token}`);
      setUserData({...data})
    }
    
  }
  useEffect(()=>{
    getUserData();
  },[])
  useEffect(()=>{
   
    if(pathname === "/ai"){
      setActive("2")
    }
  },[pathname])
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Dashboard', '1', <HomeIcon isActive={active === "1"} />),
    getItem('AI Intelligence', '2', <AiIcon isActive={active === "2"}   />),
  
  ];
  const handleSidebarClick = (e)=>{
   if(e.key === "1"){
    setActive("1")
      router.push("/")
   }else{
    setActive("2")
    router.push("/ai")
   }
  }
    return  <Layout
    style={{
      minHeight: '100vh',
    }}
  >
    <Sider style={{background:"#fff"}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Title style={{textAlign:"center", marginTop:"20px"}} level={4}>{cookie ?? ""} </Title>
      <Menu onClick={handleSidebarClick} selectedKeys={[active]} defaultSelectedKeys={[active]} mode="inline" items={items} />
    </Sider>
    <Layout style={{background:"#F4F7FE", padding:"20px"}}>
      <Header
        style={{
          padding: 0,
          background: "#F4F7FE",
          height:"auto",
          lineHeight:"normal",
          color:"#A3AED0"
        }}
      >
        <UserInfo name={userData?.user?.first_name}/>
      </Header>
    
     {children}
    </Layout>
  </Layout>
}

export default Sidebar
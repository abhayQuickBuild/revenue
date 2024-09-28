'use client'
import { Radio,Select } from "antd";
import dynamic from "next/dynamic";
const CardComponent = dynamic(() => import('./SmallCards'), { ssr: false });
const SalesCard = dynamic(() => import('./SalesCard'), { ssr: false });
const RevenueCard = dynamic(() => import('./RevenueCard'), { ssr: false });
const DatePickerComponent = dynamic(() => import('./DatePicker'), { ssr: false });

import { useEffect, useState } from "react"
import {fetchResturants, fetchSalesData, fetchSummaryData, fetchUserDetail} from "../apiUtils"
import dayjs from "dayjs"
import { getCookie, setCookie } from "../apiUtils/cookie";
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
const HomePageComponent = ()=>{
   const [brands, setBrands] = useState([]);
  const [resturants, setResturants] = useState({});
  const [selectedResturant, setSelectedResturant] = useState(null);
  const [savedDate,setSaveddate] = useState([]);
  const [salesObj,setSalesObj] = useState({sales:0,earnings:0,orders:0,});
  const [summaryData,setSummaryData] = useState([])
   const getResturants= async ()=>{
      const res = await fetchResturants();
      const resturantsSelected = res.filter(({id})=>id === "100003");
      setResturants({...resturantsSelected[0]})
      setBrands([...res]);
      setCookie("tenantName",resturantsSelected[0]?.name)
   }
   let cookie 
   if (typeof window !== 'undefined'){
    cookie = useCookieChange("token")
   }
   useEffect(()=>{
    if(cookie)
    getResturants();
   },[cookie])
    const handleChange = (idSelected)=>{
      const resturantsSelected = brands.filter(({id})=>id === idSelected);
      setResturants({...resturantsSelected[0]});
      setCookie("tenantName",resturantsSelected[0]?.name)
    }
    const handleSelectedResturants = (restId) =>{
      setSelectedResturant(restId)
    }

    const getSummaryData = async (date)=>{
      const useDate = date ?? savedDate
      console.log("summary",cookie,!cookie && !resturants?.id,useDate?.length)
      if(!cookie && !resturants?.id){
        setSaveddate(date);
        return
      }
     
      if(useDate?.length){
        const data = await fetchSummaryData(resturants?.id??"100003",dayjs(useDate?.[0]).format('YYYY-MM-DD hh:mm:ss'),dayjs(useDate?.[1]).format('YYYY-MM-DD hh:mm:ss'),selectedResturant??"")
        const data2 = await fetchSalesData(resturants?.id ?? "100003",dayjs(useDate?.[0]).format('YYYY-MM-DD hh:mm:ss'),dayjs(useDate?.[1]).format('YYYY-MM-DD hh:mm:ss'),selectedResturant??"")
        const summdata = data && data?.reduce((acc,{DiscountAmount,NetSales,TaxInSales})=>{
          return acc = {sales: acc.sales+NetSales, earning: NetSales-(DiscountAmount+TaxInSales)}
        },{sales:0,earning:0});
        setSalesObj({sales:summdata.sales,earnings:summdata.earning});
        setSummaryData([...data2])
      }
      if(date){
        setSaveddate(date)
      }
    }
    useEffect(()=>{
      console.log("cookie &&", cookie,resturants)
      if(cookie && resturants?.id){
      getSummaryData();
      }
    },[selectedResturant,resturants?.id,cookie])
    return <div style={{display:"flex", flexDirection:"column", height: "100%"}}>
    <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
      <DatePickerComponent handleChangeAction={getSummaryData}  />
      <Select
        size="default"
        placeholder="Brand"
        defaultValue={"100003"}
        value={resturants?.id}
        onChange={handleChange}
        style={{width: '200px', backgroundColor:"#DEE2EC", borderRadius:"10px"}}
        options={brands.map(({id,name})=>({label:name,value:id}))}
     
      />
       <Select
        size="default"
        placeholder="Resturant"
        defaultValue={[]}
        onChange={handleSelectedResturants}
        style={{width: '200px', backgroundColor:"#DEE2EC", borderRadius:"10px"}}
        options={resturants?.restaurants?.map(({id,branchName,branchLocation})=>({label:`${branchName}-${branchLocation}`,value:id}))}
     
      />
    </div>
  
     <div style={{display: "flex", gap: "50px", justifyContent: "center", marginBottom: "20px"}}>
      <CardComponent title={"Sales Today"} isNegative={false} value={salesObj.sales} percent={2.3} />
      <CardComponent title={"Today Earning"} isNegative={false} value={salesObj.earnings} percent={2.3} />
      <CardComponent title={"Total Orders"} isNegative={false} value={1234} percent={2.3} />
      <CardComponent title={"Total Orders"} isNegative={false} value={1234} percent={2.3} />
    </div> 
  
    {/* RevenueCard and SalesCard in columns */}
    <div style={{display: "flex", flexDirection: "column", flexGrow: 1, gap: "10px", overflow: "hidden"}}>
      <div style={{ overflowY: "auto"}}>
        <RevenueCard getSummaryData={getSummaryData} selectedResturant={selectedResturant} setSelectedResturant={setSelectedResturant} resturants={resturants} summaryData={summaryData} salesData={salesObj} />
      </div>
      <div style={{ overflowY: "auto"}}>
        <SalesCard />
      </div>
     </div>
  </div>
    
  
}

export default HomePageComponent
import { getCookie } from "./cookie";

const url = "http://143.110.254.227:8080";

export const  fetchUserDetail = async(email = "superAdmin@digitory.com",tenantId ="100003")=>{
    try{
        const res = await fetch(`${url}/v1/auth/me?email=${email}&tenant_id=${tenantId}`, {
            method:"GET",
           headers:{
            "x-api-key": "1234asda"
           }
        })
        const data = await res.json();
        return data;
    }catch{
        return false
    }
}

export const  fetchResturants = async()=>{
    try{
        const res = await fetch(`${url}/v1/dashboard/filters/restaurants`, {
            method:"GET",
           headers:{
            "Authorization": getCookie("token")
           }
        })
        const data = await res.json();
        return data;
    }catch{
        return false
    }
}

export const fetchSummaryData = async (tenantId = "100003", startDate, endDate, resturantId='')=>{
    try{
        const res = await fetch(`${url}/v1/dashboard/summary?restaurant_id=${resturantId}&tenant_id=${tenantId}&start_date=${startDate}&end_date=${endDate}`, {
            method:"GET",
           headers:{
            "Authorization": getCookie("token")
           }
        })
        const data = await res.json();
        return data;
    }catch{
        return false
    }
}

export const fetchSalesData = async (tenantId = "100003", startDate, endDate, resturantId)=>{
        try{
            const res = await fetch(`${url}/v1/dashboard/sales?restaurant_id=${resturantId}&tenant_id=${tenantId}&start_date=${startDate}&end_date=${endDate}&filter=weekly`, {
                method:"GET",
               headers:{
                "Authorization": getCookie("token")
               }
            })
            const data = await res.json();
            return data;
        }catch{
            return false
        }
    }

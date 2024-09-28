'use client'
import {Card, DatePicker, Select} from "antd";
import React, { Component, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import DatePickerComponent from "../DatePicker";
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';  // For millions
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';     // For thousands
    } else {
      return num.toString();  // For numbers less than 1000
    }
  }
function getSalesAndDiscounts(data) {
    const salesMap = new Map();
    const profitMap = new Map();
  
    data.forEach((restaurant) => {
      restaurant.data.forEach((entry) => {
        // Aggregate NetSales
        if (salesMap.has(entry.date)) {
          salesMap.set(entry.date, salesMap.get(entry.date) + entry.NetSales);
        } else {
          salesMap.set(entry.date, entry.NetSales);
        }
  
        // Aggregate DiscountAmount
        const profit = entry.NetSales - entry.TaxInSales - entry.DiscountAmount;
      if (profitMap.has(entry.date)) {
        profitMap.set(entry.date, profitMap.get(entry.date) + profit);
      } else {
        profitMap.set(entry.date, profit);
      }
      });
    });
  
    const sales = Array.from(salesMap, ([date, NetSales]) => ({ x:new Date(date), y:  (NetSales) }));
    const discounts = Array.from(profitMap, ([date, profit]) => ({ x:new Date(date), y: (profit) }));
  
    return { sales, discounts };
  }
const RevenueCard = ({resturants,summaryData, salesData,getSummaryData,selectedResturant, setSelectedResturant})=>{

    const handleSelectedResturants = (restId) =>{
        setSelectedResturant(restId);
       
      }
      const data = getSalesAndDiscounts(summaryData)
    const options = {
        theme: "light2",
        animationEnabled: true,
        height:250,
        exportEnabled: true,
     
        axisX: {
            valueFormatString: "MMM",
            interval: 1,
            intervalType: "week"
        },
        axisY: {
            title: "Value Generated",
            suffix: "Rs"
        },
        toolTip: {
            shared: true
        },
        legend: {
            dockInsidePlotArea: true,
            horizontalAlign: "right"
        },
        data: [{
            type: "spline",
           
            yValueFormatString: "#",
            name: "Sales",
            showInLegend: true,
            dataPoints: data.sales
        }, {
            type: "spline",
            xValueFormatString: "MMM",
            yValueFormatString: "#",
            name: "Profit",
            showInLegend: true,
            dataPoints: data.discounts
        }]
    };
    return <Card style={{width:"50%"}} styles={{body:{
        display:"flex"
    }}}>
        <div style={{width:"20%"}}>
        <div style={{background:"#F4F7FE", color:"#8C96B6", fontWeight:"500", fontSize:"14px", width:"fit-content", padding:"10px",borderRadius:"10px"}}>Revenue</div>
         <span style={{color:"$37.5K", fontWeight:"700",fontSize:"24px"
         }}>{formatNumber(salesData.sales)}</span>
        </div>
        <div style={{width:"100%"}}>
            <DatePickerComponent/>
            <Select
          variant="filled"
          size="default"
          placeholder="Resturants"
          value={selectedResturant}
          onChange={handleSelectedResturants}
          style={{
            width: '150px',
            marginLeft:"10px"
          }}
          options={resturants?.restaurants?.map(({id,branchName,branchLocation})=>({label:`${branchName}-${branchLocation}`,value:id}))}
          maxTagCount={1}  // Show only the first selected item
          maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}`}
          
        />
        <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
        </div>
    </Card>
}

export default RevenueCard



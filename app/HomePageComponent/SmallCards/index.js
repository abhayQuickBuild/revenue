'use client'

import React from 'react';
import { Card } from 'antd';
import SignIcon from "../../../SignInIcon";
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';  // For millions
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';     // For thousands
  } else {
    return num.toString();  // For numbers less than 1000
  }
}


const CardComponent = ({title,value,percent,isNegative}) => (
  <Card
    style={{
      width: 210,

    
    
    }}
    styles={{
        body:{
            padding:"10px",
            display:"flex",
        }
    }}
  >
    <div style={{width:"20%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <SignIcon/>
    </div>
    <div>
    <p style={{color:"#A3AED0", fontWeight:"500", fontSize:"14px", lineHeight:"normal"}}>{title}</p>
    <p style={{color:"#2B3674", fontWeight:"700", fontSize:"24px",lineHeight:"normal"}}>{formatNumber(value)}</p>
    <p style={{color:"#A3AED0", fontWeight:"400", fontSize:"12px",lineHeight:"normal"}}><span style={{color:"#05CD99"}}>+{percent}</span> since last month</p>
    </div>
  </Card>
);
export default CardComponent;
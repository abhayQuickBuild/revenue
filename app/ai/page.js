'use client'
import { Card, Input, Typography } from "antd"

export default function AI (){
    const {Title, Text} = Typography
    return <div style={{background:"#fff", height:"100%", position:"relative", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <Title style={{textAlign:"center", marginTop:"40px"}} level={3}>
            Hi, How Can we help you today ?
        </Title>
        <Title style={{textAlign:"center", marginTop:"40px",marginBottom:"40px"}} level={5}>
            Frequently Asked Questions 
        </Title>
        <div style={{display:"flex", gap:"40px", justifyContent:"center"}}>
            <Card style={{width:'210px', background:"#f4f4f4", color:"#2B3674", fontWeight:400, fontSize:"14px"}}>
                What was the sales for last week ?
            </Card>
            <Card style={{width:'210px', background:"#f4f4f4", color:"#2B3674", fontWeight:400, fontSize:"14px"}}>What was the sales for last month ?</Card>
            <Card style={{width:'210px', background:"#f4f4f4", color:"#2B3674", fontWeight:400, fontSize:"14px"}}>
            What was the highest selling product yesterday ?
            </Card>
            <Card style={{width:'210px', background:"#f4f4f4", color:"#2B3674", fontWeight:400, fontSize:"14px"}}>
                What do you need to know to create better products ?
            </Card>
        </div>
        <div style={{position:"absolute", bottom:"20px",width:"95%"}}>
        <Input.TextArea  style={{ background:"#f4f4f4", marginRight:"10px", width:"-webkit-fill-available"}} placeholder="Type your Question here"/>
        </div>
    </div>
    
}


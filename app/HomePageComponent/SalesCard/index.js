import {Card, Select} from "antd";
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const SalesCard = ()=>{

    const handleChange = ()=>{

    }
    const options = {
        theme: "light2",
        animationEnabled: true,
        height: 250,
        exportFileName: "New Year Resolutions",
        exportEnabled: true,
        title:{
            text: "Top Categories of New Year's Resolution"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: 32, label: "Health" },
                { y: 22, label: "Finance" },
                { y: 15, label: "Education" },
                { y: 19, label: "Career" },
                { y: 5, label: "Family" },
                { y: 7, label: "Real Estate" }
            ]
        }]
    }
    return <Card style={{width:"50%" }} styles={{
        body:{
            display:"flex",
        }
    }}>
         
          <div style={{width:"20%"}}>
           <div style={{background:"#F4F7FE", color:"#8C96B6", fontWeight:"500", fontSize:"14px", width:"fit-content", padding:"10px", borderRadius:"10px"}}>Sales</div>
           <span style={{color:"$37.5K", fontWeight:"700",fontSize:"24px"
         }}>$9234</span>
        </div>
        <div style={{width:"100%"}}>
        <div style={{display:"flex",gap:"10px"}}>
        <Select
          mode="multiple"
          size="default"
          placeholder="All Products"
          defaultValue={[]}
          onChange={handleChange}
          style={{
            width: '150px',
          }}
          options={[]}
        />
         <Select
          mode="multiple"
          size="default"
          placeholder="All Categories"
          defaultValue={[]}
          onChange={handleChange}
          style={{
            width: '150px',
            borderRadius:"10px"
          }}
          options={[]}
        />
        </div>
        <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
            </div>
    </Card>
}

export default SalesCard
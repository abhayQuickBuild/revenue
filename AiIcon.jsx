const AiIcon = ({isActive})=>{
return <svg width="16" height="16" viewBox="0 0 16 16" fill={isActive?"#4318FF":"#A3AED0"} xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="8" fill={isActive?"#4318FF":"#A3AED0"}/>
</svg>
}
export default AiIcon
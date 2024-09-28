
'use client'
import {DatePicker} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const DatePickerComponent = ({handleChangeAction})=>{
    const dateFormat = 'YYYY-MM-DD';
    const [selectedDates, setSelectedDates] = useState([ dayjs().subtract(30, 'day'),dayjs()]);
      const handleChange = (dates) => {
        const dateStrings = dates ? [dayjs(dates[0],dateFormat), dayjs(dates[1], dateFormat )] : [];
        setSelectedDates(dateStrings);
        console.log('Selected Date Strings:', dateStrings);
      };
    useEffect(()=>{
        handleChangeAction&&  handleChangeAction(selectedDates)
    },[selectedDates])
    return <RangePicker value={selectedDates} onChange={handleChange} style={{background:"#DEE2EC", width:"200px"}}/>
}

export default DatePickerComponent
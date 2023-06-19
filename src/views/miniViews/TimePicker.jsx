
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui//select"

import React, { useState } from 'react'

// Función independiente para calcular el precio



export default function TimePicker({ onChange }) {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);





  const handleHourChange = (value) => {
    setSelectedHour(value);
    onChange({ hour: value, minute: selectedMinute });
  }

  const handleMinuteChange = (value) => {
    setSelectedMinute(value);
    onChange({ hour: selectedHour, minute: value });
  }
  return (
    <>
      <div className="flex">
        <div >
          <Select onValueChange={handleHourChange}>
            <SelectTrigger className="w-[60px]">
            <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Hr</SelectLabel>
                <SelectItem value="01">01</SelectItem>
                <SelectItem value="02">02</SelectItem>
                <SelectItem value="03">03</SelectItem>
                <SelectItem value="04">04</SelectItem>
                <SelectItem value="05">05</SelectItem>
                <SelectItem value="06">06</SelectItem>
                <SelectItem value="07">07</SelectItem>
                <SelectItem value="08">08</SelectItem>
                <SelectItem value="09">09</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="13">13</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="17">17</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="19">19</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="21">21</SelectItem>
                <SelectItem value="22">22</SelectItem>
                <SelectItem value="23">23</SelectItem>

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center font-extrabold mx-1 h-9">:</div>
        <div>
          <Select onValueChange={handleMinuteChange}>
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Min</SelectLabel>
                <SelectItem value="00">00</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="45">45</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>

  )
}



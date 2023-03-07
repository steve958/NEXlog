import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Birthday from './Birthday'
import Meeting from './Meeting'
import Exercise from './Exercise'
import Custom from './Custom'

export default function Menu(props) {

    const { date, setNewEvent, newEvent, editEvent } = props

    const [entryType, setEntryType] = useState(editEvent.eventType || 'birthday')

    const convertedDate = date.split(' ').slice(0, 4).join(' ')

    function handleEntryType(type) {
        console.log(type);
        setEntryType(type)
    }

    return (
        <div className='flex flex-col items-center text-xl rounded-lg mt-8 h-[30vh]'>
            <p className='text-3xl w-full'>
                {convertedDate}
            </p >
            <span className='flex gap-7 mt-3 w-full justify-center'>
                <p>type of your entry</p>
                <select name="" defaultValue={entryType} onChange={(e) => handleEntryType(e.target.value)}
                    className='cursor-pointer text-slate-900 rounded-md' >
                    <option value="birthday">birthday</option>
                    <option value="meeting">meeting</option>
                    <option value="exercise">exercise</option>
                    <option value="custom">custom</option>
                </select>
            </span>
            {entryType === 'birthday' && <Birthday newEvent={newEvent} setNewEvent={setNewEvent} date={date} editEvent={editEvent} />}
            {entryType === 'meeting' && <Meeting newEvent={newEvent} setNewEvent={setNewEvent} date={date} editEvent={editEvent} />}
            {entryType === 'exercise' && <Exercise newEvent={newEvent} setNewEvent={setNewEvent} date={date} editEvent={editEvent} />}
            {entryType === 'custom' && <Custom newEvent={newEvent} setNewEvent={setNewEvent} date={date} editEvent={editEvent} />}
        </div >
    )
}

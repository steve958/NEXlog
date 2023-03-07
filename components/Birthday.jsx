import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

export default function Birthday(props) {

    const { setNewEvent, newEvent, date, editEvent } = props
    const [reminderBool, setReminderBool] = useState(editEvent.reminder || false)
    const [details, setDetails] = useState('')

    let detailsRef = useRef('')
    let reminderTimeRef = useRef(null)

    useEffect(() => {
        if (editEvent.reminder) {
            setReminderBool(editEvent.reminder)
        } else {
            setReminderBool(false)
        }
    }, [date])

    function saveEvent() {
        let details = detailsRef.current?.value
        let reminderTime = reminderTimeRef.current?.value
        setNewEvent({
            ...newEvent,
            date,
            eventType: 'birthday',
            reminder: reminderBool,
            reminderTime,
            details,
            eventId: editEvent.eventId || uuid()
        })
        detailsRef.current.value = ''
        reminderTimeRef.current.value = '24'
        setReminderBool(false)
    }

    return (
        <div className='flex flex-col'>
            <span className='flex gap-7 mt-3'>
                <p>details</p>
                {editEvent.date ?
                    <input type="text" ref={detailsRef} className='text-slate-900 rounded-md'
                        defaultValue={editEvent.details} />
                    :
                    <input type="text" ref={detailsRef} className='text-slate-900 rounded-md'
                        value={details} onChange={(e) => setDetails(e.target.value)} />}
            </span>
            <span className='flex gap-12 mt-3 items-center justify-between'>
                <p>send me a reminder</p>
                {editEvent.reminder ?
                    <label className="flex items-center relative w-max cursor-pointer select-none" id='translate-back'>
                        <input type="checkbox" id='reminder' value={reminderBool} onClick={() => setReminderBool(!reminderBool)}
                            className={`appearance-none transition-colors cursor-pointer 
                    w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-offset-black focus:ring-yellow-300 bg-green-500`} />
                        <span className="absolute font-medium text-xs uppercase right-1 text-white" value='off' htmlFor='reminder'> OFF </span>
                        <span className="absolute font-medium text-xs uppercase right-8 text-white" value='on' htmlFor='reminder'> ON </span>
                        <span className={`w-7 h-7 absolute right-0 rounded-full transform transition-transform bg-yellow-300`} />
                    </label>
                    :
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                        <input type="checkbox" id='reminder' value={reminderBool} onClick={() => setReminderBool(!reminderBool)}
                            className="appearance-none transition-colors cursor-pointer
                    w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-offset-black focus:ring-yellow-300 bg-red-500" />
                        <span className="absolute font-medium text-xs uppercase right-1 text-white" value='off' htmlFor='reminder'> OFF </span>
                        <span className="absolute font-medium text-xs uppercase right-8 text-white" value='on' htmlFor='reminder'> ON </span>
                        <span className={`w-7 h-7 absolute right-7 rounded-full transform transition-transform bg-yellow-300`} />
                    </label>}
            </span>
            <span className='flex gap-3 mt-3'>
                <span>email</span>
                <select name="select" id="select"
                    disabled={!reminderBool}
                    value={reminderBool}
                    onChange={() => setReminderBool(!reminderBool)}
                    className='text-slate-900 rounded-md cursor-pointer'
                    ref={reminderTimeRef}>
                    <option value="24" htmlFor='select'>24</option>
                    <option value="48" htmlFor='select'>48</option>
                </select>
                <p>hours before event</p>
            </span>
            <button className='p-1 mt-2 border border-solid border-yellow-300
                    relative after:absolute after:top-0 after:right-full duration-300
                    after:bg-yellow-300 after:z-10 after:w-full after:h-full 
                    overflow-hidden hover:after:translate-x-full after:duration-300 
                    hover:text-slate-900 rounded-lg'>
                <h2 className='relative z-20 select-none' onClick={saveEvent}>
                    save event
                </h2>
            </button>
        </div>
    )
}

import React, { useRef, useState } from 'react'
import uuid from 'react-uuid'

export default function Custom(props) {

    const { setNewEvent, newEvent, date, editEvent } = props
    const [details, setDetails] = useState(editEvent.details || '')
    const detailsRef = useRef('')

    function saveEvent() {
        let details = detailsRef.current.value
        if (details) {
            setNewEvent({
                ...newEvent,
                date,
                eventType: 'custom',
                reminder: false,
                reminderTime: null,
                details,
                eventId: uuid()
            })
            detailsRef.current.value = ''
        }
    }

    return (
        <div className='flex flex-col w-full'>
            <textarea ref={detailsRef} defaultValue={details}
                cols="20" rows="4" placeholder='type your note'
                className='scrollbar mt-2 rounded-lg text-slate-900 p-2'></textarea>
            <button className='p-1 mt-2 border border-solid border-yellow-300
                    relative after:absolute after:top-0 after:right-full duration-300
                    after:bg-yellow-300 after:z-10 after:w-full after:h-full 
                    overflow-hidden hover:after:translate-x-full after:duration-300 
                    hover:text-slate-900 rounded-lg'>
                <h2 onClick={saveEvent}
                    className='relative z-20 select-none'>
                    save event
                </h2>
            </button></div>
    )
}

import React, { useState } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase'

export default function EventCard(props) {

    const { date, filteredData, setFetchTrigger, setAnotherEvent, setEditEvent } = props
    const { currentUser } = useAuth()
    const [deleteModal, setDeleteModal] = useState(null)
    const convertedDate = date.split(' ').slice(0, 4).join(' ')

    function displayMessage(data) {
        let message
        switch (data.eventType) {
            case 'birthday':
                message = `Birthday upcoming - ${data.details}`
                break;
            case 'meeting':
                message = `You have a meeting - ${data.details}`
                break
            case 'exercise':
                message = `Your exercise list - - - ${data.details}`
                break
            case 'custom':
                message = `Custom event - ${data.details}`
                break;
            default:
                message = 'sisaj'
                break;
        }
        return message
    }

    function editEvent(event) {
        setEditEvent(event)
        setAnotherEvent(true)
    }

    async function deleteEvent(id) {
        const userRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(userRef)
        const events = docSnap.data().events
        const filtered = events.filter(event => event.eventId !== id)
        console.log(filtered);
        await setDoc(userRef, {
            'events': [
                ...filtered
            ]
        }, { merge: false })
        setFetchTrigger(true)
        setDeleteModal(false)
    }

    return (
        <div className='flex flex-col rounded-lg mt-8 lg:w-[50vw] w-screen max-h-[30vh] 
        overflow-auto scrollbar border-yellow-300 border-solid border-2'>
            {deleteModal && <div className='fixed flex z-30 justify-center items-center w-screen left-0 -mt-6 h-1/3 rounded-lg bg-yellow-300 bg-opacity-50'>
                <div className='opacity-w-80 bg-slate-900 flex flex-col rounded-lg p-5'>
                    <h1 className='text-white text-3xl'>Delete this event permanently?</h1>
                    <span className='flex w-full justify-around'>
                        <button onClick={() => deleteEvent(deleteModal)}
                            className='p-2 duration-300 text-xl hover:scale-150'>yes</button>
                        <button onClick={() => setDeleteModal(false)}
                            className='p-2 duration-300 text-xl hover:scale-150'>cancel</button>
                    </span>
                </div>
            </div>}
            <span className='flex w-full bg-white text-slate-900 relative'>
                <span className='flex w-1/5 items-center'>
                    <i onClick={() => setAnotherEvent(true)}
                        className="fa-solid fa-plus text-2xl ml-4 cursor-pointer duration-300 hover:rotate-90 title" title='add another event'></i>
                    <p className='text-sm '>add another event</p>
                </span>
                <p className='text-3xl w-4/5 mt-2'>
                    {convertedDate}
                </p >
                <span className='mr-3 w-1/5 flex items-center justify-end'>
                    <p >{filteredData.length} {filteredData.length === 1 ? 'event' : 'events'}</p>
                </span>
            </span>
            {filteredData.map(event => {
                return <div key={event.eventId}
                    className='flex justify-between items-center w-full hover:bg-yellow-300 hover:text-slate-900'>
                    <span>
                        {event.eventType === 'birthday' && <i className="fa-sharp fa-solid fa-gift text-white m-4 text-3xl"></i>}
                        {event.eventType === 'meeting' && <i className="fa-regular fa-handshake text-white m-4 text-3xl"></i>}
                        {event.eventType === 'exercise' && <i className="fa-solid fa-dumbbell text-white m-4 text-3xl"></i>}
                        {event.eventType === 'custom' && <i className="fa-solid fa-book text-white m-4 text-3xl"></i>}
                    </span>
                    <span>
                        <p className='text-xl m-2'>{displayMessage(event)}</p>
                        {
                            event.eventType === 'birthday'
                                ?
                                event.reminder ? <p className='text-xl'>{`Your email reminder is ${event.reminderTime} hours before`}</p> : <p className='text-xl w-full italic text-white'>no reminder set</p>
                                : event.reminder ? <p className='text-xl'>{`Your email reminder is ${event.reminderTime} minutes before`}</p> : <p className='text-xl w-full italic text-white'>no reminder set</p>
                        }
                    </span>
                    <span className='flex gap-3 m-2 mr-3 cursor-pointer text-white'>
                        <i onClick={() => editEvent(event)}
                            className="fa-solid fa-pencil text-2xl duration-300 hover:scale-125 hover:text-slate-900"></i>
                        <i onClick={() => setDeleteModal(event.eventId)}
                            className="fa-sharp fa-solid fa-trash text-2xl duration-300 hover:scale-125 hover:text-rose-400"></i>
                    </span>
                </div>
            })}
        </div >
    )
}

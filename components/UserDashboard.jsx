import React, { useEffect, useState } from 'react'
import Calendar, { TileContent } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Menu from './Menu';
import EventCard from './EventCard';

export default function UserDashboard() {

    const [value, onChange] = useState(new Date())
    const [dateClicked, setDateClicked] = useState(null)
    const [userClicked, setUserClicked] = useState(false)
    const [fetchTrigger, setFetchTrigger] = useState(false)
    const [anotherEvent, setAnotherEvent] = useState(false)
    const [editEvent, setEditEvent] = useState({})
    const [userData, setUserData] = useState([])
    const [newEvent, setNewEvent] = useState({})
    const { logout, currentUser } = useAuth()

    useEffect(() => {
        if (newEvent.date) {
            addNewEvent()
        }
    }, [newEvent])

    useEffect(() => {
        fetchUserData()
    }, [fetchTrigger])

    async function fetchUserData() {
        const userRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(userRef)
        setUserData(docSnap.data()?.events)
        setFetchTrigger(false)
    }

    function handleClick(value, e) {
        setDateClicked(value.toString())
        setAnotherEvent(false)
        setEditEvent({})
        console.log(e);
    }

    async function addNewEvent() {
        const userRef = doc(db, 'users', currentUser.uid)
        if (userData) {
            const filtered = editEvent.eventId ? userData.filter(event => event.eventId !== editEvent.eventId) : userData
            console.log(userData);
            console.log(filtered);
            await setDoc(userRef, {
                'events': [
                    ...filtered,
                    { ...newEvent, }
                ]
            }, { merge: false })
        } else {
            await setDoc(userRef, {
                'events': [
                    { ...newEvent, }
                ]
            }, { merge: false })
        }
        fetchUserData()
        setAnotherEvent(false)
        setEditEvent({})
    }

    function renderTileContent({ date, view }) {
        const result = userData.filter(event => event.date === date.toString())
        return view === 'month' && result.length > 0
            ? <p className='text-xs text-center'>{result.length === 1 ? `${result.length} event` : `${result.length} events`}</p> : null
    }

    return (
        <div className='calendar-container relative flex flex-col select-none h-full mt-10'>
            <Calendar onChange={onChange} value={value}
                onClickDay={(value, e) => handleClick(value, e)} tileContent={renderTileContent} />
            <div className='absolute right-0 top-0 -mt-10 flex gap-7'>
                <i title={`${currentUser.email}`} className="fa-solid fa-user-ninja 
                text-yellow-300 text-3xl cursor-pointer duration-300 hover:scale-125"
                    onClick={() => setUserClicked(!userClicked)}></i>
                {userClicked &&
                    <button onClick={logout} className='border border solid border-yellow-300 p-1
                 duration-300 text-rose-400 hover:text-yellow-300 hover:rounded-md ease-in'>logout</button>}
            </div>
            {dateClicked &&
                <div className='text-center text-yellow-300'>
                    {userData?.some(event => event.date === dateClicked) && !anotherEvent &&
                        <EventCard
                            date={dateClicked}
                            filteredData={userData.filter(event => event.date === dateClicked)}
                            setFetchTrigger={setFetchTrigger}
                            setAnotherEvent={setAnotherEvent}
                            setEditEvent={setEditEvent} />}
                    {(!userData?.some(event => event.date === dateClicked) || anotherEvent)
                        && < Menu
                            date={dateClicked}
                            setNewEvent={setNewEvent}
                            newEvent={newEvent}
                            editEvent={editEvent} />}
                </div>}
        </div>
    )
}


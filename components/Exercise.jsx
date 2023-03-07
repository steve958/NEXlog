import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

export default function Exercise(props) {

    const { setNewEvent, newEvent, date, editEvent } = props
    const [exercise, setExercise] = useState(editEvent.details ? formatList(editEvent.details) : [])
    const exerciseName = useRef('')
    const reps = useRef('')

    function formatList(list) {
        const split = list.split(',')
        const newList = []
        console.log(split);
        split.forEach(exercise => {
            newList.push({
                exercise: exercise.split('-')[0],
                repetitions: exercise.split('-')[1],
                id: uuid()
            })
        })
        return newList
    }


    function saveEvent() {
        if (exercise.length !== 0) {
            const details = exercise.map(exter => {
                return `${exter.exercise} - ${exter.repetitions}`
            }).toString()
            setNewEvent({
                ...newEvent,
                date,
                eventType: 'exercise',
                reminder: false,
                reminderTime: null,
                details,
                eventId: editEvent.eventId || uuid()
            })
            setExercise([])
        }

    }

    function deleteExercise(id) {
        setExercise(oldState => oldState.filter(exercise => exercise.id !== id))
    }

    function addingExercise() {
        if (exerciseName.current.value && reps.current.value) {
            setExercise([...exercise, {
                exercise: exerciseName.current.value,
                repetitions: reps.current.value,
                id: uuid()
            }])
            exerciseName.current.value = ''
            reps.current.value = ''
        }
    }

    return (
        <div className='flex flex-col select-none'>
            <span className='flex flex-col justify-start items-center h-[15vh]
            mt-2 overflow-y-auto overflow-x-hidden scrollbar'>
                {exercise.length > 0 ? exercise.map(exer => {
                    return (<div key={exer.id} className="flex w-full 
                items-center justify-between text-white">
                        <h2>{exer.exercise}</h2>
                        <span className='flex gap-5'>
                            <h2>{exer.repetitions}{exer.repetitions === '1' ? ' rep' : ' reps'}</h2>
                            <i className="fa-sharp fa-solid fa-trash text-xl text-yellow-300 
                        duration-300 hover:text-rose-400 cursor-pointer"
                                onClick={() => deleteExercise(exer.id)}></i>
                        </span>
                    </div>)
                }) : <h1 className='mt-12'>--exercise list--</h1>}
            </span>
            <span className='flex gap-3 mt-3'>
                <p>exercise</p>
                <input type="text" ref={exerciseName}
                    className='text-slate-900 rounded-md w-[10ch] text-center' />
                <p>reps</p>
                <input type="number" ref={reps} min="1"
                    className='text-slate-900 rounded-md w-[3ch] text-center' />
                <i className="fa-solid fa-check text-xl cursor-pointer
                duration-300 hover:rotate-45 hover:scale-125 hover:text-green-300"
                    onClick={addingExercise}></i>
            </span>
            <button className='p-1 mt-2 border border-solid border-yellow-300
                    relative after:absolute after:top-0 after:right-full duration-300
                    after:bg-yellow-300 after:z-10 after:w-full after:h-full 
                    overflow-hidden hover:after:translate-x-full after:duration-300 
                    hover:text-slate-900 rounded-lg'>
                <h2 onClick={saveEvent}
                    className='relative z-20 select-none'>
                    save event
                </h2>
            </button>
        </div>
    )
}

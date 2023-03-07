import React from 'react'

export default function Header() {
    return (
        <div className='sticky top-0 w-full left-0 bg-yellow-300 flex items-center justify-center p-4 px-4 text-slate-900'>
            <h1 className='text-6xl select-none tracking-wider'>nexlog</h1>
            <i className="fa-regular fa-calendar-days text-4xl relative right-1 bottom-1"></i>
        </div>
    )
}

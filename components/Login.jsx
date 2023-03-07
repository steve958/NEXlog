import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [logging, setLogging] = useState(true)
    const [mouseHover, setMouseHover] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)

    const { login, signup } = useAuth()

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        } if (logging) {
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorect email or password')
            }
            return
        }
        await signup(email, password)
    }

    return (
        <>
            <h1 className='text-yellow-300 text-3xl w-full text-center 
            select-none tracking-wider'>
                interactive calendar for tracking important things in your life</h1>
            {mouseHover ? <div className='flex-1 flex flex-col justify-center items-center gap-2 sm:gap-4'
                onMouseLeave={() => setMouseHover(false)}>
                <h1 className='font-extrabold text-5xl text-yellow-300 select-none'>{logging ? 'login' : 'register'}</h1>
                {error && <div className='w-full max-w-[30ch] border border-solid border-rose-400 text-center 
            text-rose-400 py-2'>{error}</div>}
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}
                    className='outline-none duration-300 border-b-2 border-t-2 border-solid 
                border-white focus:border-yellow-400 text-slate-900 p-2 w-full max-w-[30ch]' />
                {!logging && <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}
                    className='outline-none duration-300 border-b-2 border-t-2 border-solid 
                border-white focus:border-yellow-400 text-slate-900 p-2 w-full max-w-[30ch]' />}
                <span className='relative w-full max-w-[30ch]'>
                    <input type={passwordShow ? "text" : "password"} placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} className='outline-none duration-300 border-b-2 border-t-2
                    border-solid border-white focus:border-yellow-400 text-slate-900 p-2 w-full max-w-[30ch]' />
                    <i className="fa-sharp fa-regular fa-eye text-slate-900 text-xl 
                    absolute right-5 top-2 hover:text-yellow-300 cursor-pointer"
                        onMouseDown={() => setPasswordShow(true)}
                        onMouseUp={() => setPasswordShow(false)}></i>
                </span>
                <button onClick={submitHandler} className='w-full max-w-[30ch] border text-yellow-400 border-white 
            border-solid py-2 duration-300 
            relative after:absolute after:top-0 after:right-full after:bg-yellow-300 after:z-10 
            after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                    <h2 className='relative z-20 select-none'>SUBMIT</h2>
                </button>
                <h2 onClick={() => { setLogging(!logging); setError('') }} className='duration-300 select-none text-xl text-white 
            hover:scale-150 cursor-pointer'>{logging ? 'Register' : 'Login'}</h2>
            </div> :
                <div className='flex flex-col h-[70vh] justify-center items-center'>
                    <div className='flex justify-center items-center gap-7'>
                        <span className='flex flex-col jusify-center items-center lg:flex-row'>
                            <i className="fa-sharp fa-solid fa-gift text-white m-4 text-3xl 
                            duration-300 hover:scale-125 cursor-pointer"></i>
                            <p className='text-yellow-300'>birthdays</p>
                        </span>
                        <span className='flex flex-col jusify-center items-center lg:flex-row'>
                            <i className="fa-regular fa-handshake text-white m-4 text-3xl duration-300
                         hover:scale-125 cursor-pointer"></i>
                            <p className='text-yellow-300'>meetings</p>
                        </span>
                    </div>
                    <i className="fa-regular fa-calendar-days text-9xl text-yellow-300 
                    duration-300 hover:rotate-180 hover:scale-150 hover:text-slate-900 
                    cursor-pointer m-11"
                        onMouseEnter={() => {
                            setTimeout(() => setMouseHover(true), 310)
                        }}></i>

                    <div className='flex justify-center items-center gap-7 '>
                        <span className='flex flex-col jusify-center items-center lg:flex-row'>
                            <i className="fa-solid fa-dumbbell text-white m-4 text-3xl duration-300
                         hover:scale-125 cursor-pointer"></i>
                            <p className='text-yellow-300'>training</p>
                        </span>
                        <span className='flex flex-col jusify-center items-center lg:flex-row'>
                            <i className="fa-solid fa-book text-white m-4 text-3xl duration-300
                         hover:scale-125 cursor-pointer"></i>
                            <p className='text-yellow-300'>learning</p>
                        </span>
                    </div>
                </div>}
        </>
    )
}

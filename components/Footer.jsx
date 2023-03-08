import React from 'react'

export default function Footer() {
    return (
        <div className='flex justify-center items-center gap-8 cursor-pointer py-3 text-yellow-400'>
            <a href="https://github.com/steve958" target='_blank' rel='noreferrer'>
                <i className="fa-brands fa-github duration-300 hover:opacity-30 text-4xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/stefan-miljevic/" target='_blank' rel='noreferrer'>
                <i className="fa-brands fa-linkedin duration-300 hover:opacity-30 text-4xl"></i>
            </a>
            <a href="https://www.instagram.com/miljevicstefan/" target='_blank' rel='noreferrer'>
                <i className="fa-brands fa-instagram duration-300 hover:opacity-30 text-4xl"></i>
            </a>
        </div>
    )
}

import '../css/Root.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

function Root() {
    return (
        <div className="body">
            {/* <div className='imgbackground'> */}
            <div className='rootdiv'>
                <p>SAMRT WINDOW</p>
                <img className='C-rootimg' src='/open.png' />
                <div>
                    <Link to="/login"><button className="C-rootbtn btn bg-primary text-white">로그인</button></Link>
                </div></div>
            {/* </div> */}
        </div>
    )
}


export default Root
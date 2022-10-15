import '../css/Root.css'
import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function Root() {
    return (
        <div className="body">
            <div className='imgbackground'>
                <div className='rootdiv'>
                    <p>환영합니다.</p>
                    <Link to="/login"><button className="C-rootbtn btn bg-secondary text-white">로그인</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Root
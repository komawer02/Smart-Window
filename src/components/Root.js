import '../css/Root.css'
import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"

function Root() {
    useEffect(() => {
        console.log('테스트')
    }, [axios.get('/test')])
    return (
        <div className="body">
            <div className='imgbackground'>
                <div className='rootdiv'>
                    <h1>환영합니다.</h1>
                    <Link to="/login"><button className="btn bg-secondary text-white">로그인</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Root
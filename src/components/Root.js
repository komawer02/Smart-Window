import '../css/Root.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

function Root() {
    const navigate = useNavigate
    useEffect(() => {
        if (localStorage.getItem('ID') != null) {
            console.log('페이지 이동')
            axios.post('/auth/login', {
                ID: localStorage.getItem('ID'),
                Password: localStorage.getItem('PWD')
            })
                .then(res => {
                    console.log('axios 성공')
                    if (res.data.pass) {
                        console.log('pass 성공')
                        navigate(`/main/control/${localStorage.getItem('ID')}/${res.data.data[0].serialNum}`)
                    }
                })
                .catch(e => {
                    console.error(e);
                })
        }
    },[])
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
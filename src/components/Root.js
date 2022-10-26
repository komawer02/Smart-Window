import '../css/Root.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Root() {
    const navigate = useNavigate
    if (localStorage.getItem('ID') == null) {
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
    else {
        axios.post('/auth/login', {
            ID: localStorage.getItem('ID'),
            Password: localStorage.getItem('PWD')
        })
            .then(res => {
                if (res.data.pass) {
                    navigate(`/main/control/${localStorage.getItem('ID')}/${res.data.data[0].serialNum}`)
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}


export default Root
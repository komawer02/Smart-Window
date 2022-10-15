import '../css/findid.css'
import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'

function FindId() {
    const [serial, setSerial] = useState('')

    const handleserial = (e) => {
        setSerial(e.target.value)
    }
    const findid = () => {
        axios.post('/auth/find-id', { serialNum: serial })
            .then(res => {
                if (res.data === false) {
                    alert('시리얼 번호를 다시 확인하십시오.')
                }
                else {
                    alert(`고객님의 ID는 '${res.data}' 입니다.`)
                    window.location.replace("/Login")
                }
            })
            .catch(e => {
                console.error(e)
            })
    }
    return (
        <> 
            <Link to={'/login'}><img className="C-backbtn" src="/arrow.png" width="20" alt='back' /></Link>
            <div className='body'>
                <div className="C-findiddiv">
                    <h1>아이디 찾기</h1>
                    <hr />
                    <div className="form-floating">
                        <input className="form-control" name="serial" value={serial} onChange={handleserial} />
                        <label htmlFor="floatingInput">시리얼 번호</label>
                    </div>
                    <button className="btn btn-primary" onClick={findid}>아이디 찾기</button>
                </div>
            </div>
        </>
    )
}
export default FindId
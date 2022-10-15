import '../css/findpassword.css'
import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'

function FindPassword() {
    const [id, setId] = useState('')
    const [serial, setSerial] = useState('')

    const handleId = (e) => {
        setId(e.target.value)
    }
    const handleserial = (e) => {
        setSerial(e.target.value)
    }
    //serialerr iderr botherr
    const findpassword = () => {
        axios.post('/auth/find-password', { serialNum: serial, ID: id })
            .then(res => {
                if (res.data.err === 'serialerr') {
                    alert("시리얼 번호를 다시 확인하십시오.")
                }
                else if (res.data.err === 'IDerr') {
                    alert("아이디를 다시 확인하십시오.")
                }
                else {
                    alert(`고객님의 비밀번호는 '${res.data}' 입니다.`)
                    window.location.replace("/login")
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
                <div className="C-findpassworddiv">
                    <h1>비밀번호 찾기</h1>
                    <hr />
                    <div>
                        <div className="form-floating">
                            <input className="form-control" name="serial" value={id} onChange={handleId} />
                            <label htmlFor="floatingInput">ID</label>
                        </div>
                        <div className="form-floating">
                            <input className="form-control" name="serial" value={serial} onChange={handleserial} />
                            <label htmlFor="floatingInput">시리얼 번호</label>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={findpassword}>비밀번호 찾기</button>
                </div>
            </div>
        </>
    )
}
export default FindPassword
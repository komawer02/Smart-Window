import '../css/register.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Checkpwdcomp = () => {
    return (
        <>
            <label className="text-danger confirm">비밀번호를 확인하세요.</label>
        </>
    )
}

function Register() {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [checkpwd, setCheckpwd] = useState('');
    const [checkid, setCheckid] = useState(false);
    const [serial, setSerial] = useState('');
    const [checkserial, setCheckserial] = useState(false);
    const [windowName, setWindowName] = useState('')

    const handleId = (e) => {
        setCheckid(false)
        setId(e.target.value)
    }
    const handlePwd = (e) => {
        setPwd(e.target.value)
    }
    const handleCheckpwd = (e) => {
        setCheckpwd(e.target.value)
    }
    const handleSerial = (e) => {
        setCheckserial(false)
        setSerial(e.target.value)
    }
    const handleWindowName = (e) => {
        setWindowName(e.target.value)
    }

    const onClickRegister = () => {
        if (checkserial) {
            if (pwd === checkpwd) {
                if (pwd.length > 5) {
                    if (id.length > 5) {
                        if (checkid) {
                            axios.post('/auth/register', {
                                ID: id,
                                Password: pwd,
                                serialNum: serial,
                                location: windowName
                            })
                                .then((res) => {
                                    if (res.data) {
                                        alert('회원가입이 완료되었습니다.')
                                        window.location.replace("/Login")
                                    } else if (res.data === null) alert("회원가입을 다시 시도하십시오.")
                                    else alert("회원가입을 다시 시도하십시오.")
                                })
                                .catch((e) => {
                                    console.error(e);
                                })
                        } else alert('아이디 중복 여부를 확인하십시오.')
                    } else alert('아이디를 6자 이상 입력하십시오.')
                } else alert('비밀번호를 6자 이상 입력하십시오.')
            } else alert('비밀번호를 확인하십시오.')
        } else alert('시리얼 번호를 확인하십시오.')
    }

    const handleCheckId = () => {
        axios.post('/auth/check-id', {
            ID: id
        })
            .then((res) => {
                if (!res.data) {
                    setCheckid(false)
                    alert("아이디가 중복입니다.")
                }
                else if(id===''){
                    setCheckid(false)
                    alert('아이디를 입력하십시오.')
                }
                else {
                    setCheckid(true)
                    alert("사용 가능한 아이디입니다.")
                }
            })
            .catch(e => {
                alert('아이디를 다시 확인하십시오.')
                console.error(e);
            })
    }

    const handleCheckserial = () => {
        axios.post('/auth/check-serial', {
            serialNum: serial
        })
            .then((res) => {
                if (res.data) {
                    setCheckserial(true)
                    alert("정상적으로 등록되었습니다.")
                }
                else {
                    setCheckserial(false)
                    alert("시리얼 번호를 다시 확인하십시오.")
                }
            })
            .catch(e => {
                alert('시리얼 번호를 다시 확인하십시오.')
                console.error(e);
            })
    }
    return (
        <>
            <Link to={'/login'}><img className="C-backbtn" src="/arrow.png" width="20" alt='back' /></Link>
        <div className="body">
            <div className="adduser">
                <h1 className="h2 mb-3 text-center fw-normal">회원가입</h1>
                <hr />
                <div className="signupdiv">
                    <div>아이디</div>
                    <input className="form-control" type="text" name="ID" value={id} onChange={handleId} />
                    <div className='confirmdiv'>
                        <button className="ml-1 btn btn-light btn-outline-dark confirm" type="button" onClick={handleCheckId}>중복확인</button>
                    </div>
                    <div>비밀번호</div>
                    <input className="form-control" type="password" name="Password" value={pwd} onChange={handlePwd} />
                    <div></div>
                    <div>비밀번호 확인</div>
                    <input className="form-control" type="password" value={checkpwd} onChange={handleCheckpwd} />
                    <div className='confirmdiv'>
                        {pwd === checkpwd ? null : <Checkpwdcomp />}
                    </div>
                    <div>시리얼 번호</div>
                    <input className="form-control" type="text" name="Serial" value={serial} onChange={handleSerial} />
                    <div className='confirmdiv'>
                        <button className="ml-1 btn btn-light btn-outline-dark confirm" type="button" onClick={handleCheckserial}>시리얼 확인</button>
                    </div>
                    <div>창문 이름</div>
                    <input className="form-control" type="text" name="windowName" value={windowName} onChange={handleWindowName} />
                    <div></div>
                    <div></div>
                    <button className="mt-2 btn btn-primary" onClick={onClickRegister}>계정 생성</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;
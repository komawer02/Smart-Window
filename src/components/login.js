import '../css/login.css'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    useEffect(()=>{
        console.log('로그인 마운트')
    })
    const [id, setId] = useState('') //id 저장
    const [pwd, setPwd] = useState('') //password 저장

    const handleId = (e) => {
        setId(e.target.value)
    }
    const handlePwd = (e) => {
        setPwd(e.target.value)
    }

    const navigate = useNavigate();

    const onClickLogin = () => {
        axios.post('/auth/login', {
            ID: id,
            Password: pwd
        })
            .then(res => {
                if (res.data.pass) {
                    navigate(`/main/control/${id}/${res.data.data[0].serialNum}`)
                }
                else {
                    alert("아이디 혹은 비밀번호가 일치하지 않습니다.")
                }
            })
            .catch(e => {
                console.error(e);
            })
    }

    return (
        <div className="body">
            <main className="form-signin w-100 m-auto">
                <h1 className="h2 mb-3 text-center fw-normal">SMART WINDOW</h1>
                <div>
                    <div className="form-floating">
                        <input className="form-control" name="ID" value={id} onChange={handleId} />
                        <label htmlFor="floatingInput">ID</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="Password" value={pwd} onChange={handlePwd} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary text-center" onClick={onClickLogin}>로그인</button>
                    </div>
                </div>
                <hr />
                <Link to="/register"><p>회원가입</p></Link>
                <Link to="/find-id">아이디 찾기</Link> / <Link to="/find-password">비밀번호 찾기</Link>
                {/*<Link to="/" */}
            </main>
        </div>
    )
}

export default Login;
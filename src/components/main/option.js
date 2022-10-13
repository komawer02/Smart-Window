import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../css/option.css'
function Option() {
    const serial = useParams()
    const [temp, setTemp] = useState('')
    const [humid, setHumid] = useState('')
    const [dust, setDust] = useState('')
    const [winlist, setWinlist] = useState([{}])
    useEffect(() => {
        axios.post('/main/option-data', { serialNum: serial.serial })
            .then(res => {
                setTemp(res.data.temp)
                setHumid(res.data.humid)
                setDust(res.data.dust)
            })
            .catch(e => {
                console.error(e)
            })
        axios.post('/main/control/data-list',{ID:serial.id})
            .then((res)=>{
                console.log(res.data)
                //setWinlist(res.data.serialList)
            })
    }, [])
    
    const handleTemp = (e) => {
        setTemp(e.target.value)
    }
    const handleHumid = (e) => {
        setHumid(e.target.value)
    }
    const handleDust = (e) => {
        setDust(e.target.value)
    }

    const logout = () => {
        window.location.replace('/auth/logout')
    }

    const handleput = () => {
        axios.put('/main/option-change', {
            serialNum: serial.serial,
            temp: temp,
            humid: humid,
            dust: dust
        })
            .then(res => {
                alert("기준치가 다시 설정되었습니다.")
                console.log('시리얼 : ' + serial.serial)
                console.log('온도 : ' + temp)
                console.log('습도 : ' + humid)
                console.log('먼지 : ' + dust)
            })
            .catch(e => {
                alert("기준치 설정 에러")
                console.error(e)
            })
    }

    return (
        <div>
            <div className="text-center p-3 mb-2 bg-secondary text-white C-info">
                자동 모드 작동 상황에서 어떤 상황에서 창문을 닫을지 설정하는 페이지입니다.</div>
            <div className="dropdown C-dropdown d-flex justify-content-between">
                <button className="btn btn-white btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {serial.serial}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
{/*                     {
                        winlist.map((name, idx) => (
                            <li key={idx}><a className="dropdown-item" href={`/main/option/${serial.id}/${name}`}>{name}</a></li>
                        ))
                    } */}
                </ul>
                <button type="button" className="btn btn-danger C-btn-logout" onClick={logout}>로그아웃</button>
            </div>
            <div className="C-optionsdiv">

                <div>온도</div>
                <input type="number" min='-100' max='100' step="1" onChange={handleTemp} value={temp} />
                <div>습도</div>
                <input type="number" min='0' max='100' step="1" onChange={handleHumid} value={humid} />
                <div>미세먼지</div>
                <input type="number" min='0' max='100' step="1" onChange={handleDust} value={dust} />
                <button type="button" className="C-savebtn btn btn-primary" onClick={handleput}>저장</button>
            </div>
        </div>
    )
}

export default Option;
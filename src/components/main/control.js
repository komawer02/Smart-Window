import '../../css/control.css';
import Api from './control/api';
import AutoComponenet from './control/auto';
import Openclosecomponent from './control/openclose';

//import weatherapi from './api';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

function APIcomponent() {
    return (
        <Api />
    )
}


function Control() {
    const [winlist, setWinlist] = useState([])
    const [rain, setRain] = useState(''); //str : true,false
    const [temperature, setTemperature] = useState(''); //str
    const [humidity, setHumidity] = useState(''); //str
    const [dust, setDust] = useState(''); //str
    const [gas, setGas] = useState(''); //str : true,false
    const [state, setState] = useState(''); //str : open, close
    const [mode, setMode] = useState(''); //str : on, off

    const [serialcheck, setSerialcheck] = useState(false)
    const [inputserial, setInputserial] = useState('')
    const [inputname, setInputname] = useState('')

    var interval
    const serial = useParams();

    useEffect(() => {
        postmaindata()
        axios.post('/main/control/data-list', { ID: serial.id })
            .then((res) => {
                setWinlist(res.data.serialList)
            })
        axios.post('/main/mode', { serialNum: serial.serial })
            .then(res => {
                setMode(res.data.automode)
            })
            .catch(e => {
                console.error(e)
            })
        interval = setInterval(() => {
            postmaindata()
            axios.post('/main/mode', { serialNum: serial.serial })
                .then(res => {
                    setMode(res.data.automode)
                })
                .catch(e => {
                    console.error(e)
                })
        }, 1000 * 5)
        return (() =>
            clearInterval(interval)
        )
    }, [])

    useEffect(() => {
        if (mode === 'on' || mode === 'off') {
            axios.put('/main/mode-change', { serialNum: serial.serial, automode: mode })
                .catch(e => {
                    console.error(e)
                })
        }
    }, [mode])

    useEffect(() => {
        if (state === 'close' || state === 'open') {
            axios.put('/main/state-change', { serialNum: serial.serial, state: state })
                .catch(e => {
                    console.error(e)
                })
        }
    }, [state])

    const handlemodeon = () => { setMode('on') }
    const handlemodeoff = () => { setMode('off') }
    const handlestateopen = () => { setState('open') }
    const handlestateclose = () => { setState('close') }
    const handleinputserial = (e) => {
        setInputserial(e.target.value)
        serialcheck(false)
    }
    const handleinputname = (e) => {
        setInputname(e.target.value)
    }

    const addwindow = () => {
        if (serialcheck) {
            axios.post('/main/add-window', {
                ID: serial.id,
                serialNum: inputserial,
                location: inputname
            })
                .then(res => {
                    window.location.replace(`/main/control/${serial.id}/${serial.serial}`)
                })
                .catch(e => {
                    console.error(e)
                })
        }
        else {
            alert('시리얼 번호를 다시 확인하십시오.')
        }
    }

    const checkserial = () => {
        axios.post('/auth/check-serial', {
            serialNum: inputserial
        })
            .then((res) => {
                if (res.data) {
                    setSerialcheck(true)
                }
                else {
                    setSerialcheck(false)
                }
            })
            .catch(e => {
                alert('시리얼 등록 에러')
                console.error(e);
            })
    }

    const postmaindata = () => {
        axios.post('/main/control/data', { serialNum: serial.serial })
            .then((res) => {
                setRain(res.data.rain)
                setTemperature(res.data.temp)
                setHumidity(res.data.humid)
                setDust(res.data.dust)
                setGas(res.data.gas)
                setState(res.data.state)
            })
            .catch((e) => {
                console.log('useQuery 에러')
                console.log(e)
            })
    }

    return (
        <div className="statebody">
            <div id="statecomponent">
                <div className='imgdiv'>
                    {
                        rain === 'true' ?
                            <img src='/water.png' className='winimg rainimg' alt='weather' /> :
                            null
                    }
                    {
                        //이미지 겹처서 : rain이면 창 밖에 비오는 그림, state이면 창문 열고 닫히는거(창문 background는 투명)
                        state === 'close' ?
                            <img src="/close.png" className='winimg' alt='weather' /> :
                            <img src="/open.png" className="winimg" alt='weather' />
                    }

                </div>
                <div className="statenumber">
                    <div className="statenumbers">온도</div>
                    <div className="input-group">
                        <input type="text" className="form-control" value={temperature} readOnly />
                        <span className="input-group-text">&deg;C</span>
                    </div>
                    <div className="statenumbers">습도</div>
                    <div className="input-group">
                        <input type="text" className="form-control" value={humidity} readOnly />
                        <span className="input-group-text">%</span>
                    </div>
                    <div className="statenumbers">미세먼지</div>
                    <div className="input-group">
                        <input type="text" className="form-control" value={dust} readOnly />
                        <span className="input-group-text" style={{ fontSize: 'small' }}>㎍/㎥</span>
                    </div>
                    <div className="statenumbers">가스</div>
                    <div className="input-group">
                        {
                            gas === 'true' ?
                                <input type="text" className="form-control bg-danger text-white" value='위험' readOnly /> :
                                <input type="text" className="form-control bg-success text-white text-center" value='안전' readOnly />
                        }
                        {/* 가스가 true이면 위험(빨간색), false이면 안전(초록색) */}
                    </div>
                </div>
            </div>

            <div className="controlcomponent">
                <APIcomponent />
                <div>
                    <button className="btn btn-secondary dropdown-toggle C-dropdown-control" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {winlist.map((name, idx) => {
                            if (name.serialNum === serial.serial) {
                                return (<>{name.location}</>)
                            }
                        })}
                    </button>
                    <ul className="dropdown-menu C-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {winlist != null ?
                            winlist.map((name, idx) => (
                                //<li key={idx}>확인용{name.serialNum}</li>
                                <li key={idx}><a className="dropdown-item" href={`/main/control/${serial.id}/${name.serialNum}`}>{name.location}</a></li>
                            )) : <p>시리얼 번호 로드중...</p>
                        }
                        <hr />
                        <div>
                            <div>
                                <input type="text" placeholder={'시리얼 번호를 입력하세요.'} style={{ width: '80%' }} onChange={handleinputserial}></input>
                                <button className='btn btn-primary' type='button' onClick={checkserial}>확인</button>
                            </div>
                            {
                                serialcheck?
                                <div className='text-danger text-start'>시리얼 번호를 확인하십시오.</div>
                                :
                                <div className="text-success text-start">시리얼 번호가 유효합니다.</div>
                            }
                            <input type="text" placeholder={'창문 이름을 입력하세요.'} style={{ width: '80%' }} onChange={handleinputname}></input>
                            <button className='btn btn-primary' type='button' onClick={addwindow}>추가</button>
                        </div>
                    </ul>
                </div>
                {/*                 <Dropdowncomponent serial={serial} winlist={winlist} inputserial={inputserial} inputname={inputname}
                    checkserial={checkserial} setInputserial={setInputserial} setInputname={setInputname}/> */}
                <AutoComponenet mode={mode} onClickoff={handlemodeoff} onClickon={handlemodeon} />
                <Openclosecomponent mode={mode} state={state} onClickopen={handlestateopen} onClickclose={handlestateclose}></Openclosecomponent>
            </div>
        </div>
    )
}

export default Control
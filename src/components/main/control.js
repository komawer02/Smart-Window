import '../../css/control.css';
import State from './control/state';
import OpenClose from './control/openclose';
import Auto from './control/auto';
import Api from './control/api';

//import weatherapi from './api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Control(props) {
    const [winlist, setWinlist] = useState(['sw-001', 'sw-002', 'sw-003'])
    const [rain, setRain] = useState(''); //str : true,false
    const [temperature, setTemperature] = useState(''); //str
    const [humidity, setHumidity] = useState(''); //str
    const [dust, setDust] = useState(''); //str
    const [gas, setGas] = useState(''); //str : true,false
    const [state, setState] = useState(''); //str : open, close

    const serial = useParams();

    const [autocheck, setAutocheck] = useState(false);

    useEffect(()=>{
        axios.post('',{state:state})
    },[state])

    useEffect(() => {
        console.log('컨트롤 만운트')
        axios.post('/main/control/data', { serialNum: serial.serial })
            .then((res) => {
                console.log('query 받음')
                setRain(res.data.rain)
                setTemperature(res.data.temp)
                setHumidity(res.data.humid)
                setDust(res.data.dust)
                setGas(res.data.gas)
                setState(res.data.state)
                console.log(state);
            })
            .catch((e) => {
                console.log('useQuery 에러')
                console.log(e)
            })
    }, [])

    setInterval(() => {
        axios.post('/main/control/data', { serialNum: serial.serial })
            .then((res) => {
                console.log('query 받음')
                setRain(res.data.rain)
                setTemperature(res.data.temp)
                setHumidity(res.data.humid)
                setDust(res.data.dust)
                setGas(res.data.gas)
                setState(res.data.state)
                console.log(state);
            })
            .catch((e) => {
                console.log('useQuery 에러')
                console.log(e)
            })
    }, 5000)
    return (
        <div className="statebody">
            <div id="statecomponent">
                <div className='imgdiv'>
                    {
                        rain === 'true'? null :
                        <img src='/water.png' className='winimg rainimg' alt='weather' />
                    }
                    {
                        //이미지 겹처서 : rain이면 창 밖에 비오는 그림, state이면 창문 열고 닫히는거(창문 background는 투명)
                        state === 'true' ?
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
                <div className="api">
                    500x220
                </div>

                <div>
                    <button className="btn btn-secondary dropdown-toggle C-dropdown-control" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {serial.serial}
                    </button>
                    <ul className="dropdown-menu C-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {
                            winlist.map((name, idx) => (
                                <li key={idx}><a className="dropdown-item" href={`/main/control/${serial.id}/${name}`}>{name}</a></li>
                            ))
                        }
                        <div className='C-dropdown-div-input'>
                            <input type="text" style={{ width: '80%' }} placeholder={'시리얼 번호를 입력하세요.'}></input><button className='btn btn-primary' type='button' >+</button>
                        </div>
                    </ul>
                </div>

                <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" id="autoOnOff" style={{ cursor: 'pointer' }} value={autocheck} onChange={(e) => { setAutocheck(e.target.checked) }} />
                    <label className="form-check-label" htmlFor="autoOnOff">자동모드</label>
                </div>
                {
                    autocheck ? null :
                        state === 'close'?
                            <div className="C-openclosebtn">
                                <button type="button" className="btn btn-outline-dark" onClick={()=>{setState('open')}}>Open</button>
                                <button type="button" className="btn btn-secondary btn-outline-dark" disabled>Close</button>
                            </div> :
                            state === 'open'?
                            <div className="C-openclosebtn">
                                <button type="button" className="btn btn-secondary btn-outline-dark" disabled>Open</button>
                                <button type="button" className="btn btn-outline-dark" onClick={()=>{setState('close')}}>Close</button>
                            </div>:
                            <div>
                                <button type='button' onClick={setState('open')}></button>
                            </div>
                }
            </div>

        </div>
    )
}

export default Control
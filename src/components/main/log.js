import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/log.css'

function Log() {
    const serial = useParams()
    const [winlist, setWinlist] = useState([{}])
    const [log, setLog] = useState([]);

    useEffect(()=>{
        axios.post('/main/log-data', { serialNum: serial.serial })
        .then(res => {
            setLog(res.data.data)
        })
        axios.post('/main/control/data-list',{ID:serial.id})
        .then((res)=>{
            console.log(res.data)
            //setWinlist(res.data.serial)
        })
    },[])

    const dellog = () => {
        axios.delete('/main/delete')
    }
    return (
        <div>
            <div className="text-center p-3 mb-2 bg-secondary text-white C-loginfo">
                자동 모드 작동 상황에서 언제 어떤 상황에서 창문이 열고 닫혔는지 기록하는 페이지입니다.
            </div>
            <div className="dropdown C-dropdown">
                <button className="btn btn-white btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {serial.serial}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
{/*                     {
                        winlist.map((name, idx) => (
                            <li key={idx}><a className="dropdown-item" href={`/main/log/${serial.id}/${name}`}>{name}</a></li>
                        ))
                    } */}
                </ul>
            </div>
            {
                log.map((datetime) => {
                    const logdata = new Date(datetime.Date)
                    return (
                        <div id="logtable" className='C-dropdown'>
                            <div className="C-logtable">
                                <p className="logdataS">날짜 : {logdata.getFullYear()}-{logdata.getMonth() + 1}-{logdata.getDate()} 시간 : {logdata.getHours()}:{logdata.getMinutes()}</p>
                                <p className="logdataS"></p>
                                <p className="logdataS">--&gt; 유해가스 감지</p>
                            </div>
                            <button type="button" className="delbtn btn btn-danger">X</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Log;
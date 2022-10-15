import '../../../css/api.css'
import axios from "axios"
import { useEffect, useState } from "react"

const getbasedate = (basedate) => {
    var year = basedate.getFullYear().toString()
    var month = (basedate.getMonth() + 1).toString()
    var date = basedate.getDate().toString()
    if (month.length < 2) {
        month = '0' + month
    }
    if (date.length < 2) {
        date = '0' + date
    }
    return year + month + date
}

const getbasetime = (basedate) => {
    var hour = (basedate.getHours() - 1).toString()
    if (hour.length < 2) {
        hour = '0' + hour
    }
    return hour
}

function Api() {
    const basedate = new Date()
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
    const serviceKey = '?serviceKey=pNRmr6eKwvqN4AhTcPUJSjrh%2B1tuTg%2FRnjUW5wOPgKxR8iyzz7BOt60r54l7cvhfDX9fZFmcK4cjSt0GG3FUSg%3D%3D'
    const pageNo = '&pageNo=1'
    const numOfRows = '&numOfRows=30'
    const dataType = '&dataType=JSON'
    const base_d = '&base_date='
    const base_date = getbasedate(basedate)
    const base_t = '&base_time='
    const base_time = getbasetime(basedate) + '30'
    const nx = '&nx=62'
    const ny = '&ny=122'
    const [apidata, setApidata] = useState([]);

    useEffect(() => {
        axios.get(url + serviceKey + pageNo + numOfRows + dataType + base_d + base_date + base_t + base_time + nx + ny)
            .then((res) => {
                setApidata(res.data.response.body.items.item)
            })
            .catch((e) => {
                console.error(e)
            })

        let interval = setInterval(() => {
            axios.get(url + serviceKey + pageNo + numOfRows + dataType + base_d + base_date + base_t + base_time + nx + ny)
                .then((res) => {
                    setApidata(res.data.response.body.items.item)
                })
                .catch((e) => {
                    console.error(e)
                })
        }, 1000)
        return (() => {
            clearInterval(interval)
        })
    }, [])
    const SKY = apidata.filter(data => data.category === 'SKY')
    const T1H = apidata.filter(data => data.category === 'T1H')
    const RN1 = apidata.filter(data => data.category === 'RN1')
    const SKYdata = SKY.slice(1, 5)
    const T1Hdata = T1H.slice(1, 5)
    const RN1data = RN1.slice(1, 5)

    return (
        <div className='C-apifulldiv'>
            {
                SKYdata.map((sky, idx) => {
                    return (
                            <Weatherdiv key={idx} time={Number(base_time.substring(0,2))+2+idx} img={RN1data[idx].fcstValue === '강수없음' ? sky.fcstValue : 5} temp={T1Hdata[idx].fcstValue} rain={RN1data[idx].fcstValue}/>)
                })
            }
        </div>
    )
}

function Weatherdiv(props) {
    return (
        <div>
            {
                props.time>23 ?
                <div>{props.time-24}시</div>:
                <div>{props.time}시</div>
            }
            <Weatherimg img={props.img} />
            <Weathertemp temperature={props.temp} />
            <Weatherrain rain={props.rain} />
        </div>
    )
}

function Weatherimg(props) {
    return (
        <p>
            {
                props.img == 4 ?
                    <img className="C-apiimg" src="/cloud.png" /> :
                    props.img == 3 ?
                        <img className="C-apiimg" src='/cloud-sun.png' /> :
                        props.img == 1 ?
                            <img className="C-apiimg" src='/sun.png' /> :
                            props.img == 5 ?
                                <img className="C-apiimg" src='/rain.png' /> :
                                <p>img 에러</p>
            }
        </p>
    )
}

function Weathertemp(props) {
    return (
        <p>
            온도 : {props.temperature}
        </p>
    )
}

function Weatherrain(props) {
    let rain = null
    if (props.rain === '강수없음') {
        rain = 0
    }
    else {
        rain = props.rain
    }
    return (
        <p>
            강수량 : {rain}
        </p>
    )
}

export default Api
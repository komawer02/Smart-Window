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
    const [basedate] = useState(new Date())
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
    let interval

    useEffect(() => {
        axios.get(url + serviceKey + pageNo + numOfRows + dataType + base_d + base_date + base_t + base_time + nx + ny)
            .then((res) => {
                setApidata(res.data.response.body.items.item)
            })
            .catch((e) => {
                console.error(e)
            })
        interval = setInterval(() => {
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
        <div className="C-apidivs mt-2">
            {
                props.time>23 ?
                <div>{props.time-24}시</div>:
                <div>{props.time}시</div>
            }
            <Weatherimg img={props.img} time={props.time}/>
            <Weathertemp temperature={props.temp} />
            <Weatherrain rain={props.rain} />
        </div>
    )
}

function Weatherimg(props) {
    return (
        <div>
            {
                props.img == 4 ?
                    <img className="C-apiimg" src="/cloud.png" /> :
                    props.img == 3 ?
                        props.time>5&&props.time<19?
                            <img className="C-apiimg" src='/cloud-sun.png' /> :
                            <img className="C-apiimg" src='/cloud-moon.png'/>
                        :
                        props.img == 1 ?
                            props.time>5&&props.time<19?
                                <img className="C-apiimg" src='/sun.png' /> :
                                <img className="C-apiimg" src='/moon.png'/>
                                :
                            props.img == 5 ?
                                <img className="C-apiimg" src='/rain.png' /> :
                                <p>img 에러</p>
            }
        </div>
    )
}

function Weathertemp(props) {
    return (
        <div>
            온도 : {props.temperature}
        </div>
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
        <div>
            강수량 : {rain}
        </div>
    )
}

export default Api
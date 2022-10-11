import axios from "axios"

const openAPI = (url,serviceKey,pageNo,numOfRows,dataType,base_d,base_date,base_t,base_time,nx,ny)=>{
    axios.get(url+serviceKey+pageNo+numOfRows+dataType+base_d+base_date+base_t+base_time+nx+ny)
    .then((res)=>{
        console.log(res.data.response.body.items.item)
        return res.data.response.body.items.item
    })
    .catch((e)=>{
        console.error(e)
    })
}

const getbasedate = ()=>{
    return (
        Date.prototype.getFullYear.toString
        +Date.prototype.getMonth.toString
        +Date.prototype.getDate.toString
        )
}
/*
function Api() {
        var thistime = new Date(),
        const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
        const serviceKey = '?serviceKey=pNRmr6eKwvqN4AhTcPUJSjrh%2B1tuTg%2FRnjUW5wOPgKxR8iyzz7BOt60r54l7cvhfDX9fZFmcK4cjSt0GG3FUSg%3D%3D',
        const pageNo = '&pageNo=1',
        const numOfRows = '&numOfRows=30',
        const dataType = '&dataType=JSON',
        const base_d = '&base_date=',
        const base_t = '&base_time=',
        const nx = '&nx=62',
        const ny = '&ny=122',
        const year = '',
        const month = '',
        const day: '',
        const base_date: '',
        const hours: '',
        const minutes: '',
        const base_hours: '',
        const base_time: '',
        const items: null,
        const T1Hs: [],
        const RN1s: [],
        const PTYs: [],
        const apidiv: [0, 1, 2, 3]
    apiquery.items=openAPI()

    return(
        
    )
}

export default Api*/
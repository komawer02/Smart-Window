const express = require('express');
var router = express.Router();


router.get('/register', (req, res) => {
    req.app.db.collection('serial').findOne({serialNum : req.query.serialNum}, (에러, 결과) => {  //꺼졌다 켜졌을때 대비
        if(결과 == null) {
            req.app.db.collection('serial').insertOne({serialNum : req.query.serialNum, registration : "N"}, (에러, 결과) => {      
                if(에러) {
                    res.json({check : "false"});
                } else {
                    res.json({check : "true"});
                } 
        })
    }else {
        res.json({check : "true"});
    }
})
})


router.post('/sensing', (req, res) => {
    req.app.db.collection('data-serial').findOne({serialNum : req.query.serialNum}, (에러, 결과) => {
        var updated = {temperature : req.query.temp, humidity : req.query.humid, rain : req.query.rain, gas : req.query.gas, state : req.query.state};

        var inserted = {serialNum : req.query.serialNum, temperature : req.query.temp, humidity : req.query.humidity, rain : req.query.rain, gas : req.query.gas, state : req.query.state, dust : "20"};

        if (결과 != null) {
            req.app.db.collection('data-serial').updateOne({serialNum : req.query.serialNum}, {$set : updated}, (에러, 결과) => {
                res.json("update!!");
            })
        } else {
            req.app.db.collection('data-serial').insertOne(inserted, (에러, 결과) => {
                res.json("insert!!");
            })
        }
    })
})


module.exports = router;
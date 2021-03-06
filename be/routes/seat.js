
const express = require("express");
var router = express.Router();

const seat_controller = require("../controllers/seat");

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");//设置跨越 白名单
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

router.use(resApplicationJson);
router.post("/add",seat_controller.add);
router.post('/update',seat_controller.update);
router.post('/findone', seat_controller.findSelected);
router.post('/finduserone', seat_controller.findOrder);
router.delete('/remove', seat_controller.remove);
router.get('/listone', seat_controller.listone)
module.exports = router;
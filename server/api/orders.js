const router = require('express').Router()
const { models: { Order }} = require('../db')
const OrderPlant = require('../db/models/OrderPlant')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const orders = await OrderPlant.findAll()
        res.json(orders)
    } catch (error) {
        next(error)
    }
})

router.get("/:orderId", async (req,res,next)=> {
    try{
        const singleOrder = await OrderPlant.findAll({
            where:{
                orderId:req.params.orderId
            }
        })
        res.json(singleOrder)
    }catch (error) {
        next(error)
    }
})


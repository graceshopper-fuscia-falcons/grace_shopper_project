const router = require('express').Router()
const { models: { Plant }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const plants = await Plant.findAll()
        res.json(plants)
    } catch (error) {
        next(error)
    }
})

router.get("/:plantId", async (req,res,next)=> {
    try{
        const singlePlant = await Plant.findByPk(req.params.plantId)
        res.json(singlePlant)
    }catch (error) {
        next(error)
    }
})
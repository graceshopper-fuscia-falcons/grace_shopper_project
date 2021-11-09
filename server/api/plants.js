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
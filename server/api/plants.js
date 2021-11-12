const router = require('express').Router()
const { models: { Plant }} = require('../db')
const { requireToken, isAdmin }= require('./gatekeepingMiddleware');

module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const plants = await Plant.findAll()
        res.json(plants)
    } catch (error) {
        next(error)
    }
})

router.post('/', requireToken, isAdmin, async (req, res, next) => {
    try {
        res.status(201).send(await Plant.create(req.body));
    } catch (error) {
        next(error)
    }
})

router.get("/:plantId", async (req, res, next) => {
    try{
        const singlePlant = await Plant.findByPk(req.params.plantId)
        res.json(singlePlant)
    } catch (error) {
        next(error)
    }
})

router.put('/:plantId', requireToken, isAdmin, async (req, res, next) => {
    try {
        const plant = await Plant.findByPk(req.params.plantId);
        res.send(await plant.update(req.body));
    } catch (error) {
        next(error)
    }
})

router.delete('/:plantId', requireToken, isAdmin, async (req, res, next) => {
    try {
        const plant = await Plant.findByPk(req.params.plantId);
        res.send(await plant.destroy());
    } catch (error) {
        next(error)
    }
})
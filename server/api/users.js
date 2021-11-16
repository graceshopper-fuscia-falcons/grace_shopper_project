const router = require('express').Router()
const { models: { User, Order, Plant }} = require('../db')
const OrderPlant = require('../db/models/OrderPlant')
const { requireToken, isAdmin, isAdminOrCurrentUser }= require('./gatekeepingMiddleware');

module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {

  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!

      include: Order,
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where:{
        id: req.params.userId
      },
      include: Order
    })
    res.json(singleUser);
  }
    catch(err){
     next(err)
    }
})

router.get('/:userId/current-order', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  try{
    const targetOrder = await Order.findOne({
      where:{
        userId: req.params.userId,
        isCart: true
      }
    })
    const userOrder = await OrderPlant.findAll({
      where:{
          orderId: targetOrder.id
      }
    })
    res.json(userOrder)
  }catch(err){
    next(err)
  }
} )


router.get('/:userId/current-order/:plantId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  try{
    const targetOrder = await Order.findOne({
      where:{
        userId: req.params.userId,
        isCart: true
      }
    })
    const orderedPlant = await OrderPlant.findAll({
      where:{
          orderId: targetOrder.id,
          plantId: req.params.plantId
      }
    })
    res.json(orderedPlant)
  }catch(err){
    next(err)
  }
} )

router.delete('/:userId/current-order/:plantId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  try{
    const targetOrder = await Order.findOne({
      where:{
        userId: req.params.userId,
        isCart: true
      }
    })
    await targetOrder.removePlants(req.params.plantId)
    res.json(targetOrder)
  }catch(err){
    next(err)
  }
} )

router.post('/:userId/current-order/:plantId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  let addedQuantity = parseInt(req.body.qty)
  if(addedQuantity && addedQuantity > 0){
    try{
      const targetPlant = await Plant.findByPk(req.params.plantId)
      let price = targetPlant.price
      const targetOrder = await Order.findOne({
        where:{
          userId: req.params.userId,
          isCart: true
        }
      })
      const orderPlantThru = await OrderPlant.findOne({
        where: {
          orderId: targetOrder.id,
          plantId: req.params.plantId
        }
      })
      let updatedQuantity = addedQuantity
      if(orderPlantThru){
        let prevQuantity = parseInt(orderPlantThru.quantity)
        updatedQuantity += prevQuantity
        await targetOrder.removePlants(req.params.plantId)
      }
      await targetOrder.addPlants(req.params.plantId, {through: {price: price, quantity: updatedQuantity}})
      res.json(targetOrder)
    }catch(err){
      next(err)
    }
  }else{
    res.status(500).send("Invalid number")
  }
})

router.post('/:userId/current-order/:plantId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  let addedQuantity = parseInt(req.body.qty)
  if(addedQuantity && addedQuantity > 0){
    try{
      const targetPlant = await Plant.findByPk(req.params.plantId)
      let price = targetPlant.price
      const targetOrder = await Order.findOne({
        where:{
          userId: req.params.userId,
          isCart: true
        }
      })
      const orderPlantThru = await OrderPlant.findOne({
        where: {
          orderId: targetOrder.id,
          plantId: req.params.plantId
        }
      })
      let updatedQuantity = addedQuantity
      if(orderPlantThru){
        let prevQuantity = parseInt(orderPlantThru.quantity)
        updatedQuantity += prevQuantity
        await OrderPlant.update(
          {
            quantity: updatedQuantity
          },
          {
          where: {
            orderId: targetOrder.id,
            plantId: req.params.plantId
          }
        })

        // await targetOrder.removePlants(req.params.plantId)
      }
      else {
      await targetOrder.addPlants(req.params.plantId, {through: {price: price, quantity: updatedQuantity}})
      }
      res.json(targetOrder)
    }catch(err){
      next(err)
    }
  }else{
    res.status(500).send("Invalid number")
  }
})


router.put('/:userId/current-order/:plantId', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  let updatedQuantity = req.body.newQty
  if(updatedQuantity && updatedQuantity > 0 ){
    try{
      // const targetPlant = await Plant.findByPk(req.params.plantId)
      // let price = targetPlant.price
      const targetOrder = await Order.findOne({
        where:{
          userId: req.params.userId,
          isCart: true
        }
      })
      await OrderPlant.update(
        {
          quantity: updatedQuantity
        },
        {
        where: {
          orderId: targetOrder.id,
          plantId: req.params.plantId
        }
      })


      res.json(targetOrder)
    }catch(err){
      next(err)
    }
  }else{
    res.status(500).send("Invalid number")
  }
} )

router.put('/:userId/current-order', requireToken, isAdminOrCurrentUser, async (req, res, next) => {
  try {
    const targetOrder = await Order.update(
      {
        isCart: false
      },
      {
      where: {
        userId: req.params.userId,
        isCart: true
      }
    }
    );
    const newOrder = await Order.create();
    newOrder.setUser(req.params.userId);
    res.json(targetOrder);
  }catch(err){
    next(err)
  }

})

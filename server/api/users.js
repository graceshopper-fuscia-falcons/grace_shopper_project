const router = require('express').Router()
const { models: { User, Order }} = require('../db')
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

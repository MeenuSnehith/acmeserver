const {Delivery} = require('../models')

module.exports = {
  async addDelivery (req, res) {
    try {
      console.log(req.body)
      const delivery = await Delivery.create(req.body)
      res.send(delivery.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'delivery already exist.'
      })
    }
  },
  async getAllDeliverys (req, res) {
    try {
      const delivery = await Delivery.findAll({
        Limit:50,
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async getAllDeliveryByUser (req, res) {
    try {
      const delivery = await Delivery.findAll({
        limit: 50,
        where: { orderTakenBy: req.params.id },
        order: [
          ['estimatedDeliveryTime', 'ASC']
        ]
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async getDeliveryById (req, res) {
    try {
      const delivery = await Delivery.findOne({
        where: { id: req.params.id }
      })
      console.log("Found delivery")
      res.send(delivery)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get delivery'
      })
    }
  },
  async deleteDelivery (req, res) {
    try {
      const delivery = await Delivery.destroy({
        where: { id: req.params.id}
      })
      console.log("Deleted delivery")
      res.send({status: "Success", deleteddeliverys: delivery})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete delivery: ' + err
      })
    }
  },
  async updateDelivery (req, res) {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const delivery = await Delivery.update({
        pickupCustomerName: req.body.pickupCustomerName,
        pickupCustomerId: req.body.pickupCustomerId,
        pickupAvn: req.body.pickupAvn,
        pickupStreet: req.body.pickupStreet,
        pickupTime: req.body.pickupTime,
        pickupRoute: req.body.pickupRoute,
        pickupActualTime: req.body.pickupActualTime,
        deliveryCustomerName: req.body.deliveryCustomerName,
        deliveryCustomerId: req.body.deliveryCustomerId,
        deliveryAvn: req.body.deliveryAvn,
        deliveryStreet: req.body.deliveryStreet,
        deliveryTime: req.body.deliveryTime,
        deliveryRoute: req.body.deliveryRoute,
        deliveryActualTime: req.body.deliveryActualTime,
        deliveryStatus: req.body.deliveryStatus,
        orderTakenBy: req.body.orderTakenBy,
        estimatedPrice: req.body.estimatedPrice
      } ,{
        where:{ id: req.params.id }
      })
      console.log("Updated delivery: " + delivery)
      res.send({status: "Success", updateddeliverys : delivery})
    } catch (err) {
      res.status(500).send({
        error: 'An error while trying to update delivery: ' + err
      })
    }
  }
}

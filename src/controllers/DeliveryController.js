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
        HotelName: req.body.HotelName,
        ImageURL: req.body.ImageURL
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

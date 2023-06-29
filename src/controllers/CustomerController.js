const {Customer} = require('../models')

module.exports = {
  async addCustomer (req, res) {
    try {
      console.log("add customer req:" + req.body)
      const customer = await Customer.create(req.body)
      res.send(customer.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Customer already exist.'
      })
    }
  },
  async getAllCustomer (req, res) {
    try {
      const customer = await Customer.findAll({
        Limit:30,
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log("Found Customer")
      res.send(customer)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get Customer'
      })
    }
  },
  async getAllCustomerById (req, res) {
    try {
      const customer = await Customer.findAll({
        limit: 50,
        where: { id: req.params.id }
      })
      console.log("Found Customer")
      res.send(customer)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get Customer'
      })
    }
  },
  async deleteCustomer (req, res) {
    try {
      const customer = await Customer.destroy({
        where: { id: req.params.id}
      })
      console.log("Deleted Customer")
      res.send({status: "Success", deletedCustomers: customer})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete Customer: ' + err
      })
    }
  },
  async updateCustomer (req, res) {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const customer = await Delivery.update({
        name: req.body.name,
        street: req.body.street,
        avenue: req.body.avenue
      } ,{
        where:{ id: req.params.id }
      })
      console.log("Updated Customer: " + customer)
      res.send({status: "Success", updatedCustomers : customer})
    } catch (err) {
      res.status(500).send({
        error: 'An error while trying to update Customer: ' + err
      })
    }
  }
}

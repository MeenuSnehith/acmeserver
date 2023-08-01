const {Config} = require('../models')

module.exports = {
  async addConfig (req, res) {
    try {
      console.log(req.body)
      const config = await Config.create(req.body)
      res.send(config.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Config already exist.'
      })
    }
  },
  async getAllConfigs (req, res) {
    try {
      const config = await Config.findAll({
        Limit:10
      })
      console.log("Found Configs")
      res.send(config)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get Config'
      })
    }
  },
  async updateConfig (req, res) {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const config = await Config.update({
        name: req.body.name,
        value: req.body.value
      } ,{
        where:{ id: req.params.id }
      })
      console.log("Updated Config: " + config)
      res.send({status: "Success", updatedConfig : config})
    } catch (err) {
      res.status(500).send({
        error: 'An error while trying to update Config: ' + err
      })
    }
  }
}

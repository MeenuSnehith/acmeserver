const AuthenticationController = require('./controllers/AuthenticationController')
const CustomerController = require('./controllers/CustomerController')
const DeliveryController = require('./controllers/DeliveryController')
const ConfigController = require('./controllers/ConfigController')

module.exports=(app) => {
    app.post('/register', 
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.get('/users',
        AuthenticationController.getAllUsers)
    app.delete('/user/:id',
        AuthenticationController.deleteUser)

    app.get('/deliverys',
        DeliveryController.getAllDeliverys)
    app.post('/delivery',
        DeliveryController.addDelivery)
    app.get('/deliveryById/:id',
        DeliveryController.getDeliveryById)
    app.get('/deliveryByUser/:id',
        DeliveryController.getAllDeliveryByUser)
    app.put('/deliveryUpdate/:id',
        DeliveryController.updateDelivery)
    app.delete('/delivery/:id',
        DeliveryController.deleteDelivery)
    app.post('/shortestPath',
        DeliveryController.GetShortestDistance)
    app.post('/customerReportByID',
        DeliveryController.getCustomerReportByID)
    app.post('/customerReports',
        DeliveryController.getCustomerReports)
    app.post('/deliveryReportByID',
        DeliveryController.getDeliveryReportByID)

    app.get('/customers',
        CustomerController.getAllCustomer)
    app.post('/customer',
        CustomerController.addCustomer)
    app.delete('/customer/:id',
        CustomerController.deleteCustomer)

    app.get('/configs',
        ConfigController.getAllConfigs)
    app.post('/config',
        ConfigController.addConfig)
    app.put('/config/:id',
        ConfigController.updateConfig)
}

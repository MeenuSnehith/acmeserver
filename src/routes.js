const AuthenticationController = require('./controllers/AuthenticationController')
const CustomerController = require('./controllers/CustomerController')
const DeliveryController = require('./controllers/DeliveryController')

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
    app.post('/addDelivery',
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
    
    app.get('/customers',
        CustomerController.getAllCustomer)
    app.post('/addCustomer',
        CustomerController.addCustomer)
    app.delete('/customer/:id',
        CustomerController.deleteCustomer)
}

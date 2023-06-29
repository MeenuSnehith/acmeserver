const AuthenticationController = require('./controllers/AuthenticationController')
const CustomerController = require('./controllers/CustomerController')
const DeliveryController = require('./controllers/DeliveryController')

module.exports=(app) => {
    app.post('/register', 
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.get('/getAllUsers',
        AuthenticationController.getAllUsers)
    app.delete('/deleteUser/:id',
        AuthenticationController.deleteUser)

    app.get('/getAllDeliverys',
        DeliveryController.getAllDeliverys)
    app.post('/addDelivery',
        DeliveryController.addDelivery)
    
    app.get('/getAllCustomers',
        CustomerController.getAllCustomer)
    app.post('/addCustomer',
        CustomerController.addCustomer)
    app.delete('/deleteCustomer/:id',
        CustomerController.deleteCustomer)
}

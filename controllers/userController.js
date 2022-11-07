const { authService } = require('../services');

//login & register
//fake login, it will never fail

const login = (req, res) => {
   res.status(200).send({ token: authService.createToken() });
}

const register = (req, res) => {

}

const sayHi = (req, res) => {
    res.status(200).send('Hola mundo, estas autenticado!');
}
//exporting functions
module.exports = {
    login,
    register,
    sayHi,
}
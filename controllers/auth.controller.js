const {User} = require("../models/models");
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports.login = async (req, res) => {
    const {username, password} = req.query
    // sample check
    if (username === 'admin' && password === '123456') {
        req.session.user = {username, password}
        res.send({code: 0, data: 'login success'})
    } else {
        res.send({code: 1, data: 'login failed'})
    }
}



module.exports.logout = async (req, res) => {
    req.session.user = null
    res.send({code: 0, data: 'logout success'})
}


module.exports.register = async (req, res) => {
    const {username, password, firstname, lastname, email} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({username, hashedPassword, firstname, lastname, email})
        const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '7d'})
        res.send({code: 'M04', data: user, token: token})
    } catch (error) {
        res.send({code: 'M05'})
    }
    res.send({code: 'M15'})
}
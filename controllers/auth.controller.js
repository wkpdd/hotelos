const {User} = require("../models/models");
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            res.send({code: 'M02'})
            return
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            res.send({code: 'M08'})
            return
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '7d'})
        res.send({code: 'M06', data: user, token: token})
    } catch (error) {
        res.send({code: 'M02'})
    }
}


module.exports.logout = async (req, res) => {
    req.session.user = null
    res.send({code: 0, data: 'logout success'})
}


module.exports.register = async (req, res) => {
    const {username, password, email} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({username, password: hashedPassword,email})
        const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '7d'})
        res.send({code: 'M04', data: user, token: token})
        return 
    } catch (error) {
        res.send({code: 'M05'})      
    }
    res.send({code: 'M15'})
}
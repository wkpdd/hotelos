const {User} = require("../models/models");


module.exports.checkIfEmailExists = async (req,res,next) => {
    const email = req.body.email;

    const result = await User.findOne({ where: { email: email } });
    if (req.body.next && !result) {
        req.body.emailExist = result
        next()
    }

    res.send({code: 'M00'})
}


module.exports.checkIfUsernameExists = async (req,res,next) => {
    const username = req.body.username;
    const result = await User.findOne({ where: { username: username } });
    if (req.body.next && !result) {
        req.body.usernameExist = result
        next()
    }

    res.send({code: 'M01'})
}
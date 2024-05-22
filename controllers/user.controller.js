const {User} = require("../models/models");


module.exports.checkIfEmailExists = async (req,res,next) => {
    const email = req.body.email;

    const result = await User.findOne({ where: { email: email } });
    if (req.body.next && result === null) {
        req.body.emailExist = result
        next()
        return
    }

    res.send({code: 'M00', data:{
        next: req.body.next,
        result: result, 
        comp: req.body.next && result === null,
        c: result === null
    } })
}


module.exports.checkIfUsernameExists = async (req,res,next) => {
    const username = req.body.username;
    const result = await User.findOne({ where: { username: username } });
    if (req.body.next && result === null) {
        req.body.usernameExist = result
        next()
        return 
    }

    res.send({code: 'M01'})
}
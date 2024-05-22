const Role = require('../models/models').Role

module.exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.send({
            code: "M17",
            data: roles
        })
    } catch (error) {
        res.send({
            code: "M16",
            message: error
        })
    }
}


module.exports.createRole = async (req, res) => {
    const {
        name
    } = req.body
    try {
        const role = await Role.create({
            name
        })
        res.send({
            code: "M18",
            data: role
        })
    } catch (error) {
        res.send({
            code: "M19",
            message: error
        })
    }
}


module.exports.checkIfRoleExists = async (req, res, next) => {
    const name = req.body.name
    const role = await Role.findOne({
        where: {
            name: name,
            isDeleted: false,
        }
    });
    if (role === null) {
        req.body.roleExist = role
        next()
        return
    }
    res.send({
        code: "M20",
        data: role
    })
}


module.exports.searchForRole = async (req, res) => {
    try {
        const name = req.body.name
        // search using like 
        const role = await Role.findOne({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        res.send({
            code: "M17",
            data: role
        })
    } catch (error) {
        res.send({
            code: "M16",
            message: error
        })
    }
}


module.exports.checkRoleIfDeleted = async (req, res, next) => {
    const id = req.params.id
    const role = await Role.findOne({
        where: {
            role_id: id
        }
    });
    if (role.isDeleted == 0) {
        req.body.roleDeleted = role.isDeleted
        next()
        return
    }
    res.send({
        code: "M21",
        data: role
    })
}


module.exports.deleteRole = async (req, res) => {
    const id = req.params.id
    try {

        const role = await Role.update({
            where: {
                role_id: id, 
            }, 
            isDeleted: true
        });
        res.send({
            code: "M22",
            data: role
        })
    } catch (error) {
        res.send({
            code: "M23",
            message: error
        })
    }
}
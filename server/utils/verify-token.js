const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const Admin = require('../models/Admin');

const { secret } = process.env;

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        })
    }
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token'
            })
        }
        let {
            id
        } = decoded
        Admin.findOne({
                where: {
                    id: id
                }
            })
            .then(function (user) {
                //console.log('user is this ',user)
                if (user) {
                    req.user = user
                    next()
                    return
                }
                return res.json({
                    success: false,
                    message: 'No Such User'
                })
            }).catch((() => res.json({
                success: false,
                message: 'UnExpected error'
            })))
    })
}
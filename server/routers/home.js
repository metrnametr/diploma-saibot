const homeRouter = require('express').Router();


const obj = {
    id: 1,
    name: 'Bob',
    lastname: 'Hope'
}

homeRouter.get('/', (req, res) => {
    res.json(obj)
})


module.exports = homeRouter;
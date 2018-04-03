const router = require('express').Router()
const {Thing} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Thing.findAll()
    .then(things => res.send(things))
    .catch(next)
})

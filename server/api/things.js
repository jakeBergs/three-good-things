const router = require('express').Router()
const {Thing} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Thing.findAll()
    .then(things => res.json(things))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Thing.findById(req.params.id)
    .then(thing => res.json(thing))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Thing.findById(req.params.id)
    .then(thing => thing.update({description: req.body.description}))
    .then(update => res.json(update))
    .catch(next)
})

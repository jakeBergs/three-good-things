const router = require('express').Router()
const {User, Thing} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id/things', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.getThings()
    })
    .then(things => res.json(things))
    .catch(next)
})

// router.get('/:id/things/today', (req, res, next) => {
//   User.findById(req.params.id)
//     .then(user => {
//       return user.getThings({where: {createdAt: '2018-03'}})
//     })
// })

router.post('/:id/thing', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Thing.create(req.body)
        .then(thing => {
          user.addThing(thing)
          res.json(thing)
        })
    })

})

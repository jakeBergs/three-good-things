const router = require('express').Router()
const { User, Thing } = require('../db/models')
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

// get things done today
router.get('/:id/things/today', (req, res, next) => {
  const today = new Date();
  console.log(today)
  console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  User.findById(req.params.id)
    .then(user => {
      return user.getThings({
        where: {
          createdAt: {
            $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
          }
        }
      })
    })
    .then(things => {
      // console.log(things)
      res.json(things)
    })
    .catch(next)
})

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

// return a users positive thing. Don't include today
router.get('/:id/thing/random', (req, res, next) => {
  const randomInt = max => {
    return Math.floor(Math.random() * max)
  }

  const today = new Date();

  User.findById(req.params.id)
    .then(user => {
      return user.getThings({
        where: {
          createdAt: {
            $lt: new Date(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()))
          }
        }
      })
    }).then(things => {
      const randThing = things[randomInt(things.length)];
      res.json(randThing.content);
    })
    .catch(console.error)
})

// const timeDate = () => {
//   const today = new Date();
//   const offset = 5;
// }

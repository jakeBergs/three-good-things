/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const Promise = require('bluebird')
const db = require('../server/db')
const {User, Thing} = require('../server/db/models')

function generateThings() {
  return [Thing.build({content: 'Petted a puppy!'}),
    Thing.build({content: 'meditated for 20 minutes'}),
    Thing.build({content: 'finished a CRUD app'}),
    Thing.build({content: 'Found 5 dollars on the ground'}),
    Thing.build({content: 'bought a coworker hot chocolate'}),
    Thing.build({content: 'got date with crush'})]
}

function createThings() {
  return Promise.map(generateThings(), thing => thing.save());
}

function createUsers() {
  return Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jake@bergal.com', password: 'jmb'})
  ])
}

async function associateUsersThings() {
  const user1 = await User.findById(1);
  const user3 = await User.findById(3);

  await user1.setThings([1, 2, 3])
  await user3.setThings([4, 5, 6])

}

async function seed () {
  await db.sync({force: true})
  console.log('syncing deb')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  console.log('creating users')
  await createUsers();

  console.log('creating things')
  await createThings();

  console.log('seeding associations')
  await associateUsersThings();
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

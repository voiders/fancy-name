const test = require('tape')
const request = require('../../components/utils/supertest')
const app = require('../../index')

const { User } = require('../../models')

const req = request(app)

let user

test('setup: clean', function (t) {
  t.plan(1)
  User.remove({}, function (err) {
    t.error(err)
    t.end()
  })
})

test('Should be empty', function (t) {
  req.get('/api/users', 200, function (err, res) {
    t.error(err, 'No error')
    t.deepEqual(res.body, [], 'Empty')
    t.end()
  })
})

test('Should be a not found request', function (t) {
  req.get('/api/users/5872931d3a2faa5d36382692', 404, function (err, res) {
    t.error(err, 'No error')
    t.equal(res.body, null)
    t.end()
  })
})

test('Should create a new user', function (t) {
  const newUser = {
    displayName: 'Diplay name',
    username: 'testUser',
    email: 'user@test.email'
  }

  req.post('/api/users', 201, function (err, res) {
    t.error(err, 'No error')
    t.equal(res.body.username, newUser.username)
    t.equal(res.body.email, newUser.email)
    user = res.body
    t.end()
  }, newUser)
})
test('Should find the user', function (t) {
  req.get('/api/users/' + user._id, 200, function (err, res) {
    t.error(err)
    t.equal(res.body.username, user.username)
    t.equal(res.body.email, user.email)
    t.end()
  })
})

test('Should update the user', function (t) {
  const newUser = {
    username: 'newUsername',
    email: 'new@test.email',
    noUserProperty: 'foo'
  }

  req.put('/api/users/' + user._id, 200, function (err, res) {
    t.error(err, 'No error')
    t.equal(res.body.displayName, user.displayName, 'Should be the same name')
    t.equal(res.body.username, newUser.username, 'Should be the new username')
    t.equal(res.body.email, newUser.email, 'Should be the new username')
    t.equal(res.body.noUserProperty, undefined, 'Should ignore the property')
    t.end()
  }, newUser)
})

test('There should be an element', function (t) {
  req.get('/api/users', 200, function (err, res) {
    t.error(err, 'No error')
    t.equal(res.body.length, 1)
    t.end()
  })
})

// TODO: Change the comments, name the routes that are being tested
// TODO: Create error test for GET, POST, PUT, DELETE

test.onFinish(() => process.exit(0))

const test = require('tape')
const sinon = require('sinon')
const response = require('../utils/response')

function createSpies (params) {
  const res = {
    status () {
      return this
    },
    json () {
      return this
    },
    setHeader () {
      return this
    }
  }

  const spyStatus = sinon.spy(res, 'status')
  const spyJson = sinon.spy(res, 'json')
  const spySetHeader = sinon.spy(res, 'setHeader')

  return {
    res,
    spyStatus,
    spyJson,
    spySetHeader
  }
}

test('Behavior of the `created` function', function (t) {
  // mockRes.restore()
  const result = {}
  const {res, spyStatus, spyJson, spySetHeader} = createSpies()
  response.created(res)(result)

  t.true(spyStatus.withArgs(201).calledOnce)
  t.true(spyJson.withArgs(result).calledOnce)
  t.equal(spySetHeader.callCount, 0)

  t.end()
})

test('Behavior of the `notFound` function', function (t) {
  let result = {foo: 'something'}
  const {res, spyStatus, spyJson, spySetHeader} = createSpies()

  t.equal(response.notFound(res)(result), result)
  t.equal(spyStatus.callCount, 0)
  t.equal(spyJson.callCount, 0)
  t.equal(spySetHeader.callCount, 0)

  result = null

  t.equal(response.notFound(res)(result), result)
  t.true(spyStatus.withArgs(404).calledOnce)
  t.equal(spyJson.callCount, 0)
  t.equal(spySetHeader.callCount, 0)
  t.end()
})

test('Behavior of the `OK` function', function (t) {
  const {res, spyStatus, spyJson, spySetHeader} = createSpies()
  const result = {}

  response.OK(res)(result)
  t.equal(spyStatus.callCount, 0)
  t.true(spyJson.withArgs(result).calledOnce)
  t.true(spySetHeader.withArgs('Content-Type', 'application/json').calledOnce)
  t.end()
})

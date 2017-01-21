// BASE ON: https://github.com/gtramontina/passport-stub

var done, passportStub

done = function (user, req, next) {
  return next(null, user)
}

passportStub = (function (_this) {
  return function (req, res, next) {
    var passport
    if (!_this.active) {
      return next()
    }
    passport = {
      deserializeUser: done,
      serializeUser: done,
      _userProperty: 'user',
      _key: 'passport'
    }
    req.__defineGetter__('_passport', function () {
      return {
        instance: passport,
        session: {
          user: _this.user
        }
      }
    })
    req.__defineGetter__('user', function () {
      return _this.user
    })
    req.__defineSetter__('user', function (val) {
      _this.user = val
    })
    return next()
  }
})(this)

exports.use = function (app) {
  this.app = app
  return this.app.use(passportStub)
}

exports.install = function (app) {
  this.app = app
  return this.app._router.stack.unshift({
    match: function () {
      return true
    },
    path: '',
    handle: passportStub,
    handle_request: passportStub,
    _id: 'passport.stub'
  })
}

exports.uninstall = function () {
  if (!this.app) {
    return
  }
  return this.app._router.stack.forEach(function (middleware, index, stack) {
    if (middleware._id === 'passport.stub') {
      return stack.splice(index, 1)
    }
  })
}

exports.login = function (user) {
  if (!this.app) {
    throw new Error('Passport Stub not installed. Please run "passportStub.install(app)" first.')
  }
  this.active = true
  this.user = user
}

exports.logout = function () {
  this.active = false
}

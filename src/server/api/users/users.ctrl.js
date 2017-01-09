const {User: model} = require('../../models')
const response = require('../../components/utils/response.js')

exports.post = (req, res) =>
  model.create(req.body)
    .then(response.created(res))
    .catch(response.serverError(res))

exports.getOne = (req, res) =>
  model.findOne({_id: req.params.id})
    .then(response.notFound(res))
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.getAll = (req, res) =>
  model.find({})
    .then(response.OK(res))
    .catch(response.serverError(res))

exports.put = (req, res) =>
  model.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .then(response.OK(res))
    .catch(response.serverError(res))

const express = require('express')
const bodyParser = require('body-parser')

const Promotions = require('../models/promotions')

const promoRouter = express.Router()
promoRouter.use(bodyParser.json())

promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .get((req, res, next) => {
    Promotions.find({})
      .then((promo) => {
        res.json(promo)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    Promotions.create(req.body)
      .then((promo) => {
        res.json(promo)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not suported on /promotions')
  })
  .delete((req, res, next) => {
    Promotions.remove({})
      .then((resp) => {
        res.json(resp)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then((promo) => {
        res.json(promo)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not suported on /promotions/'
      + req.params.promoId)
  })
  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
    }, { new: true })
      .then((promo) => {
        res.json(promo)
      }, (err) => next(err))
      .catch((err) => next(err))
  })
  .delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
      .then((resp) => {
        res.json(resp)
      }, (err) => next(err))
      .catch((err) => next(err))
  });

module.exports = promoRouter


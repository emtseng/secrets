const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.route('/')
.get(function (req, res, next) {

  Secret.findAll()
    .then( function(allSecrets) {
      console.log(allSecrets);
      res.render('index', { secrets: allSecrets })
    }
    ).catch(next);
})
.post(function(req, res, next) {
  Secret.create({
    text: req.body.text
  })
    .then(function(createdSecret) {
      res.redirect('/')
    })
    .catch(next);
})

router.get('/add', function (req, res, next) {
  res.render('add');
});

router.get('/:secretId', function (req, res, next) {

  Secret.findById(req.params.secretId, {
    include: [Comment]
  })
    .then((foundSecret) => {
      res.render('secret', { secret: foundSecret } )
    })
    .catch(next);
});

router.use('/:secretId/comments', require('./comments-subrouter'));

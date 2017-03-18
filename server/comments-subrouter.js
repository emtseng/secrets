const express = require('express');
const router = express.Router({
    mergeParams: true // so these routes can receive "secretId"
});
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.route('/')
.get((req, res, next) => {
    Secret.findById(req.params.secretId, { //route implicitly comes with req.params.secretId
        include: [Comment] //equivalent of { model: Comment, as: 'comments' }
    })
    .then((secret) => {
        res.send(secret.comments)
    })
    .catch(next);
})
.post((req, res, next) => {
    Comment.create({
        text: req.body.text,
        secretId: req.params.secretId //implicit in the URL
    })
    .then((createdComment) => {
        res.redirect('/secrets/'+ req.params.secretId)
    })
    .catch(next);
});

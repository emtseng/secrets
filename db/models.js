const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/secrets', { logging: false });

const Secret = db.define('secret', {
    text: {
        type: Sequelize.TEXT
    }
});

const Comment = db.define('comment', {
    text: {
        type: Sequelize.TEXT
    }
});

Comment.belongsTo(Secret);
Secret.hasMany(Comment);

module.exports = {
    Secret,
    Comment
};

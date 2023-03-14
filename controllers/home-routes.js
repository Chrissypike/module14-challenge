const router = require('express').Router();
const sequalize = require('../config/connection');
const { Posts, User, Comments } = require('../models');
const posts = require('../models/posts');

router.get('/', (req, res) => {
    Posts.findAll({
        attributes: [
            'id',
            'caption',
            'text',
            'created_at',
        ],
        include: [{
            model: Comments,
            attributes: ['id', 'comments_content', 'posts_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['user_name']
            }
        },
        {
            model: User,
            attributes: ['user_name']
        }
    ]
    })
    .then(dbPostsData => {
        const post = dbPostsData.map(posts => posts.get({ plain: true }));

        res.render('homepage', { post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'caption',
            'text',
            'created_at',
        ],
        include: [{

   
        }]
    })
})  

module.exports = router;
const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get specific user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [{
            model: Posts,
            attributes: ['id', 'caption', 'text', 'created_at']
        },
        {
            model: Comments,
            attributes: ['id', 'comment_content', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
const router = require('express').Router();

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

// middlewares
const validateActionData = require("../middlewares/validataActionData");
const validateActionId = require("../middlewares/validateActionId");

// GET all actions 
router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({ message: "No actions exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

// GET action by ID
router.get('/:id', validateActionId, (req, res) => {
    const { id } = req.action;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "serer error", err });
        });
})

// POST a new action
router.post('/:id', validateActionData, (req, res) => {
    const actionData = req.body;
    Actions.insert(actionData)
        .then(action => {
            const newAction = { ...action, ...actionData };
            res.status(200).json(newAction);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

module.exports = router;
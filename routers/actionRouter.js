const router = require('express').Router();

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

// middlewares
const validateActionId = require("../middlewares/validateActionId");
const validateActionData = require("../middlewares/validataActionData");
const validateActionToProject = require("../middlewares/validateActionToProject");

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
router.post('/', validateActionData, validateActionToProject, (req, res) => {
    const actionData = req.body;
    // actionData.project_id should match a project id 
    Actions.insert(actionData)
        .then(action => {
            const newAction = { ...action, ...actionData };
            res.status(200).json(newAction);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

// PUT action by ID
router.put('/:id', validateActionId, validateActionData, (req, res) => {
    const { id } = req.action;
    const actionData = req.body;
    const updatedAction = { id, ...actionData };
    Actions.update(id, actionData)
        .then(updated => {
            res.status(200).json({ message: "Action updated successfully", updatedAction });
        })
        .catch(err => {
            res.status(500).json({ error: "serer error", err });
    })
})

// DELETE action by ID
router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.action;
    const action = req.action;
    const removedAction = { id, ...action };
    Actions.remove(id)
        .then(removed => {
            res.status(200).json({ message: "Action removed successfully", removedAction });
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})


module.exports = router;
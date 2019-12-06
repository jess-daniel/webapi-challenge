const Actions = require('../data/helpers/actionModel');

const validateActionId = (req, res, next) => {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            } else {
                req.action = action;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ message: "server error", err });
        })
}

module.exports = validateActionId;
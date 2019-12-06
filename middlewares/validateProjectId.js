const Projects = require('../data/helpers/projectModel');

const validateProjectId = (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({ message: "The project with the specified ID does not exist." });
            } else {
                req.project = project;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ message: "server error", err });
        })
}

module.exports = validateProjectId;
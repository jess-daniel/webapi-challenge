const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const validateActionToProject = (req, res, next) => {
    const actionData = req.body;
    Projects.get()
        .then(project => {
            console.log(actionData);
            console.log(project);
            if (actionData.project_id === project[0].id) {
                next();
            } else {
                res.status(404).json({ message: "There is not a project with the specified ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
}

module.exports = validateActionToProject;
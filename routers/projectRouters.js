const router = require('express').Router();

const Projects = require("../data/helpers/projectModel");

// Middleware
const validateProjectId = require("../middlewares/validateProjectId");
const validateProjectData = require('../middlewares/validateProjectData');

// GET all projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects);
            } else {
                res.status(404).json({ message: "Projects do not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Server error", err });
    })
})

// GET project by ID
router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.project;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
        })
})

// POST a new project
router.post('/', validateProjectData, (req, res) => {
    const bodyData = req.body;
    Projects.insert(bodyData)
        .then(project => {
            const newProject = { ...project, ...bodyData };
            res.status(201).json({ newProject });
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

// PUT a project
router.put('/:id', validateProjectId, validateProjectData, (req, res) => {
    const { id } = req.project;
    const projectData = req.body;
    const updatedProject = { id, ...projectData };
    Projects.update(id, projectData)
        .then(updated => {
            res.status(200).json({message: "project updated successfully", updatedProject});
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.project;
    const project = req.project;
    Projects.remove(id)
        .then(removed => {
            res.status(200).json({ message: "project deleted successfully", project });
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
})

module.exports = router;
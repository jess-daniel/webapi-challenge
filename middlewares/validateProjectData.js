const validateProjectData = (req, res, next) => {
    const data = req.body;
    if (Object.keys(data).length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (!data.name) {
        res.status(400).json({ message: "missing required name field" });
    } else if (!data.description) { 
        res.status(400).json({ message: "missing required description field" });
    } else {
        next();
    }
}

module.exports = validateProjectData;
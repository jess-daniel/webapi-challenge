const validateActionData = (req, res, next) => {
    const data = req.body;
    if (Object.keys(data).length === 0) {
        res.status(400).json({ message: "missing post data" });
    } else if (req.method === "POST" && !data.project_id) {
        res.status(400).json({ message: "missing required project ID field" });
    } else if (!data.description) {
        res.status(400).json({ message: "missing required description field" });
    } else if (!data.notes) { 
        res.status(400).json({ message: "missing required notes field" });
    } else {
        next();
    }
}

module.exports = validateActionData;
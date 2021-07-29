const router = require("express").Router();
const { listModel } = require("../models");


// create/add
router.post("/", async (req, res) => {
    const {
        title,
        year,
        overview,
        watched,
    } = req.body;

try {
    const List = await listModel.create({
        title,
        year,
        overview,
        watched,
    });
    res.status(201).json({
    message: "List successfully created",
    List,
    });
} catch (err) {
    res.status(500).json({
    message: `Failed to create list: ${err}`,
    });
}
});

module.exports= router;
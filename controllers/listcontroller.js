const router = require("express").Router();
const { listModel } = require("../models");

router.get("/", async(req, res) => {
    try{
        const allMovies = await listModel.findAll();
        res.status(200).json(movies);
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

router.put("/update", async (req, res) => {
    const {title, year, overview, watched} = req.body
    const userId =  req.user.id
    const query = {
        where: {
            owner: userId
        }
    };
    const updatedList = {
        title: title,
        year: year,
        overview: overview,
        watched: watched
    };
    try {
        await ListModel.update(updatedList, query)
        . then ((result) => {
            res.status(200).json({
                message: "Watchlist successfully updated",
                updatedList: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update WatchList: ${err}`,
        });
    }
});


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


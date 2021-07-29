const router = require("express").Router
const {ListModel} = require("../models");

router.get("/", async(req, res) => {
    try{
        const allMovies = await ListModel.findAll();
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
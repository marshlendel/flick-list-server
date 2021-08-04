const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { ListModel } = require("../models");

//! Display Watch List
router.get("/", async (req, res) => {
  const { id } = req.user;
  try {
    const WatchList = await ListModel.findAll({
      where: {
        owner: id,
      },
    });
    if (WatchList[0].owner === id) {
      res.status(200).json(WatchList);
    }
  } catch (err) {
    const WatchList = await ListModel.findAll({
      where: {
        owner: id,
      },
    })
    if (WatchList) {
      res.status(200).json({
        message: "You watch list is empty",
      });
    } else {
      res.status(500).json({ error: err });
    }
  }
});

//! Add movie
router.post("/add", async (req, res) => {
  const { id } = req.user;

  const { title, year, overview, watched } = req.body;
  const alreadyInList = await ListModel.findAll({
    where: {
      owner: id,
      title: title
    }
  })

  try {
    if(alreadyInList.length !== 0) {
      res.status(409).json({
        message: "is already in your Watch List",
        copyMovie: alreadyInList
      }) 
    }else {
      const AddedMovie = await ListModel.create({
        title,
        year,
        overview,
        watched,
        owner: id,
      });
      res.status(201).json({
        message: "successfully added",
        AddedMovie,
      });
    }  
  } catch (err) {
      res.status(500).json({
        message: `Failed to add movie: ${err}`,
      });
    
  }
});

//! Delete Movie
router.delete("/delete/:movieId", async (req, res) => {
  const { movieId } = req.params;
  const { id } = req.user;

  try {
    let deletedMovie = await ListModel.destroy({
      where: {
        id: movieId,
        owner: id,
      },
    });
    if (deletedMovie) {
      res.status(200).json({
        message: "removed from watch list",
      });
    } else {
      res.status(404).json({
        message: "already not in watch list",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//! Update if a movie is watched or not
router.put("/update/:movieId", async (req, res) => {
  const { id } = req.user;
  const { watched } = req.body;
  const { movieId } = req.params;

  const query = {
    where: {
      id: movieId,
      owner: id,
    },
  };
  const updatedMovie = {
    watched: watched,
  };
  try {
    await ListModel.update(updatedMovie, query);
    res.status(200).json({
      message: "Movie successfully updated",
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to update WatchList: ${err}`,
    });
  }
});

module.exports = router;

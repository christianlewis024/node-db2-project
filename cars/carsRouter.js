const express = require("express");
const knex = require("knex");
const knexfile = require("../knexfile");
const environment = process.env.NODE_ENV || "development"; // undefined | production

const dbConfig = knexfile[environment];

const db = require("../data/dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then((ids) => {
      db("cars")
        .where({ id: ids[0] })
        .then((newFruitEntry) => {
          res.status(201).json(newFruitEntry);
        });
    })
    .catch((err) => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "404, no record found by that id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "500 - server error" });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "deleted" });
      } else {
        res.status(404).json({ message: "404 no record of ID found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

function isValidPost(cars) {
  return Boolean(
    cars.id && cars.vin && cars.make && cars.model && cars.mileage
  );
}
module.exports = router;

const express = require("express");
const router = express.Router();

//import Gwent model
const Gwent = require("../../models/Gwent");

/**
 * @route  POST /api/cards
 * @desc   Create a new card
 * @access public
 *
 */
router.post("/", (req, res) => {
  let newGwentCard = new Gwent({
    name: req.body.name.toLowerCase(),
    faction: req.body.faction,
    unit: req.body.unit,
    range: req.body.range,
    strength: req.body.strength,
    special: req.body.special ? req.body.special : "n/a"
  });

  newGwentCard
    .save()
    .then(newCard =>
      res.json({ msg: "Card created successfully!", new_card: newCard })
    );
});

/**
 * @route  GET /api/cards
 * @desc   get ALL cards
 * @access public
 */
router.get("/", (req, res) => {
  Gwent.find().then(allCards => res.json(allCards));
});

/**
 * @route  GET /api/cards/:id
 * @desc   get a card with the id provided
 * @access public
 */
router.get("/:id", (req, res) => {
  Gwent.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Cannot find card ${req.params.id}, error: ${err}` })
    );
});

/**
 * @route  PUT /api/cards/:id
 * @desc   Update a card with the id provided
 * @access public
 */
router.put("/:id", (req, res) => {
  Gwent.findById(req.params.id)
    .then(foundCard =>
      Gwent.updateOne(
        {
          name: foundCard.name,
          faction: foundCard.faction,
          unit: foundCard.unit,
          range: foundCard.range,
          strength: foundCard.strength,
          special: foundCard.special
        },
        {
          name: req.body.name ? req.body.name : foundCard.name,
          faction: req.body.faction ? req.body.faction : foundCard.faction,
          unit: req.body.unit ? req.body.unit : foundCard.unit,
          range: req.body.range ? req.body.range : foundCard.range,
          strength: req.body.strength ? req.body.strength : foundCard.strength,
          special: req.body.special ? req.body.special : foundCard.special
        }
      ).then(updatedCard =>
        res.json({
          msg: `Card ${req.params.id} was updated successfully!`
        })
      )
    )
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Cannot find card ${req.params.id}, error: ${err}` })
    );
});

/**
 * @route  DELETE /api/cards/:id
 * @desc   delete a card with the id provided
 * @access public
 */
router.delete("/:id", (req, res) => {
  Gwent.findById(req.params.id)
    .then(foundCard =>
      Gwent.deleteOne({ _id: foundCard._id }).then(() =>
        res.json({
          msg: `${req.params.id} was successfully removed from database!`
        })
      )
    )
    .catch(err =>
      res
        .status(400)
        .json({ msg: `Cannot find card ${req.params.id}, error: ${err}` })
    );
});

module.exports = router;

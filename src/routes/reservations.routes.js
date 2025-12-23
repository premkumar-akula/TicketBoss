const express = require("express");
const controller = require("../controllers/reservations.controller");

const router = express.Router();

router.post("/", controller.reserveSeats);
router.delete("/:reservationId", controller.cancelReservation);
router.get("/", controller.getSummary);

module.exports = router;

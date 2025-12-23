const { event, reservations } = require("../data/store");
const { v4: uuid } = require("uuid");

exports.reserveSeats = (req, res) => {
  const { partnerId, seats } = req.body;

  if (!seats || seats <= 0 || seats > 10) {
    return res.status(400).json({ error: "Invalid seat count" });
  }

  if (event.availableSeats < seats) {
    return res.status(409).json({ error: "Not enough seats left" });
  }

  const reservationId = uuid();

  event.availableSeats -= seats;
  event.version += 1;

  reservations.set(reservationId, {
    reservationId,
    partnerId,
    seats,
    status: "confirmed"
  });

  res.status(201).json({
    reservationId,
    seats,
    status: "confirmed"
  });
};

exports.cancelReservation = (req, res) => {
  const reservation = reservations.get(req.params.reservationId);

  if (!reservation || reservation.status === "cancelled") {
    return res.status(404).json({ error: "Reservation not found" });
  }

  reservation.status = "cancelled";
  event.availableSeats += reservation.seats;
  event.version += 1;

  res.status(204).send();
};

exports.getSummary = (req, res) => {
  res.json({
    eventId: event.eventId,
    name: event.name,
    totalSeats: event.totalSeats,
    availableSeats: event.availableSeats,
    reservationCount: event.totalSeats - event.availableSeats,
    version: event.version
  });
};

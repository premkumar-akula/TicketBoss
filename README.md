#  TicketBoss – Event Ticketing API

TicketBoss is a lightweight Node.js REST API for real-time event seat reservations using **optimistic concurrency control** to prevent double booking.

---

##  Project Structure

```
ticketboss/
│
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   │
│   ├── routes/
│   │   └── reservations.js # Reservation routes
│   │
│   ├── controllers/
│   │   └── reservation.controller.js
│   │
│   ├── services/
│   │   └── reservation.service.js
│   │
│   ├── models/
│   │   └── reservation.model.js
│   │
│   └── utils/
│       └── concurrency.js  # Version / OCC helpers
│
├── data/
│   └── store.json          # In-memory / file-based storage
│
├── package.json
├── README.md
└── .gitignore
```

---

##  Setup Instructions

###  Prerequisites

* Node.js **v18+**
* npm **v9+**

### 2️⃣ Install Dependencies

```bash
npm install
```

###  Run the Application

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### 4️⃣ Server URL

```
http://localhost:3000
```

---

##  API Documentation

###  Create Reservation

**POST** `/reservations`

#### Request Body

```json
{
  "userId": "user_101",
  "seatNumber": 25
}
```

#### Response (201)

```json
{
  "reservationId": "res_abc123",
  "seatNumber": 25,
  "status": "reserved",
  "version": 1
}
```

---

### 🔍 Get Reservation by ID

**GET** `/reservations/:reservationId`

#### Response (200)

```json
{
  "reservationId": "res_abc123",
  "userId": "user_101",
  "seatNumber": 25,
  "status": "reserved",
  "version": 1
}
```

---

###  Cancel Reservation

**DELETE** `/reservations/:reservationId`

#### Headers (Required for OCC)

```
If-Match: 1
```

#### Response (200)

```json
{
  "message": "Reservation cancelled successfully"
}
```

#### Error Responses

```json
{
  "error": "Reservation not found"
}
```

```json
{
  "error": "Version conflict. Reservation has been modified."
}
```

---

### 📊 List All Reservations

**GET** `/reservations`

#### Response (200)

```json
[
  {
    "reservationId": "res_abc123",
    "seatNumber": 25,
    "status": "reserved"
  }
]
```

---

## 🧠 Technical Decisions

### 🔹 Architecture

* **Express.js** for REST API
* Layered architecture:

  * Routes → Controllers → Services → Models
* Clean separation of concerns for maintainability

### 🔹 Concurrency Control

* **Optimistic Concurrency Control (OCC)**
* Each reservation has a `version` field
* Client must send the current version using `If-Match` header
* Prevents double cancellation or conflicting updates

### 🔹 Storage Method

* File-based JSON storage (`store.json`)
* Acts as in-memory persistence for simplicity
* Easy to replace with DB (PostgreSQL / MongoDB)

### 🔹 Assumptions

* Single event with **500 seats**
* One seat = one reservation
* Authentication is out of scope
* API consumers handle retries on version conflict

---

## 🚀 Future Enhancements

* JWT-based authentication
* Database integration
* Seat availability endpoint
* Reservation expiry & auto-release
* Rate limiting

---

## 🧑‍💻 Author

**Prem Kumar Akula**


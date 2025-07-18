# Transportation App - Microservices Architecture

A Transportation ride-hailing application built using Node.js and a microservices architecture. The system is designed to be scalable, fault-tolerant, and loosely coupled.

## Architecture Overview

Each feature is encapsulated in its own **microservice**, and services communicate via **REST APIs**, **WebSocket**, or **Kafka** (for async communication).

### Services

| Service               | Description                                                       |
|-----------------------|-------------------------------------------------------------------|
| **API Gateway**       | Routes requests to the appropriate services.                      |
| **Auth Service**      | Handles authentication, JWT issuing, and OAuth2 flows.            |
| **User Service**      | Handles user registration, profile, roles (driver/rider).         |
| **Location Service**  | Handles real-time driver locations using WebSockets + Geohashing. |
| **Ride Service**      | Handles ride requests (creation, canceling, completion)           |

## Technologies Used

- **Node.js**, **Express.js**
- **Docker** + **Docker Compose**
- **Kafka** (Event-driven communication)
- **MySQL**, **PostgreSQL**, **MongoDB**
- **Redis** / **Memcached** (Caching + location lookup)
- **WebSocket** (Real-time tracking)

## Installation & Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/abdelrhman-saeed/RideHail
cd ride-hail
```

### 2. Create `.env` files for each service

Each microservice requires a `.env` file. Examples:

#### `user-service/.env`
```env
PORT=3001
DB_HOST=user-db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=user_service
```

#### `auth-service/.env`
```env
PORT=3002
JWT_SECRET=supersecret
USER_SERVICE_URL=http://user-service:3001
```

(Repeat for all services.)

### 3. Install Docker + Docker Compose

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### 4. Build & Start All Services

```bash
docker-compose up --build
```

This will start:

- All microservices
- Kafka + Zookeeper
- Databases (MySQL, MongoDB, etc.)
- Memcached
- API Gateway

### 5. Access Services

You can now interact with services via:

- API Gateway: `http://localhost:8080`
- Each service directly (e.g. `http://localhost:3001`, `3002`, etc.)

## How to Test the System

1. **Register** rider/driver via `user-service`
2. **Login** via `auth-service` to receive a JWT token
3. **Request a ride** via `matching-service`
4. **Update driver location** via `location-service` (WebSocket)
5. **Track ride** in real-time

## Project Structure

```
ride-hail/
│
├── user-service/
├── auth-service/
├── location-service/
├── ride-service/
├── api-gateway/
├── docker-compose.yml
└── README.md
```

---

## Endpoints

### User Service

| Method | Endpoint                 | Description                   |
|--------|--------------------------|-------------------------------|
| POST   | `/users/drivers`         | Registers a new driver.       |
| GET    | `/users/drivers`         | Get all drivers.              |
| GET    | `/users/drivers/:id`     | Get a driver.                 |
| PUT    | `/users/drivers/:id`     | Update a driver.              |
| POST   | `/users/riders`          | Registers a new rider.        |
| GET    | `/users/riders`          | Get all riders.               |
| GET    | `/users/riders/:id`      | Get a rider.                  |
| PUT    | `/users/riders/:id`      | Update a rider.               |

---

### Auth Service

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/auth/login`        | Logs in a user and returns a JWT. |
| POST   | `/auth/refresh`      | obtain a new jwt and refresh token using the old refresh token |
| POST   | `/auth/logout`       | revokes the refresh token |

---

### Ride Service

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/rides`             | rider creates a new ride  |
| PUT    | `/rides/:id`         | update ride               |
| GET    | `/rides/:id`         | get ride details          |

---


### Location Service

| Method | Endpoint | Message                                |   Description     |
|--------|----------|----------------------------------------|-------------------|
| WS     | `/`      | { "type": "trackDriver", "driverId": ":id" }               | Track Driver      |
| WS     | `/`      | { "type": "updateDriverLocation", "driverId": ":id", "latitude": "latitude-number", "longitude": "longitude-number" }  | Update Driver Location |

---

## Postman Collection

You can test the API using the provided Postman collection:
[Download Collection](./ride_hail_app_postman_collection.json)

##  Future Improvements

- Add unit + integration tests
- Add monitoring (Grafana + Prometheus)
- Add distributed tracing (Jaeger)
- Add message retries / DLQ for Kafka

## License

MIT

## Author

Abdelrhman Saeed  
Backend Developer | PHP + Node.js  
[LinkedIn](https://www.linkedin.com/in/abdelrhman-saeed-a76074216/) | [Email](mailto:abdelrhmansaeed001@gmail.com)
> **Note:** This project is a submission for the [Weather API Wrapper Service project on roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service).

# Weather API

A simple Node.js RESTful API that fetches and returns weather data using the Visual Crossing Weather API. Includes Redis caching and rate limiting for performance and security.

## Features

- Fetch current and forecast weather data by location
- Rate limiting to prevent abuse (100 requests per 15 minutes per IP)
- Redis caching for faster repeated queries
- Input validation and error handling

## Tech Stack

- Node.js
- Express.js
- Redis (for caching)
- express-rate-limit (for rate limiting)
- Visual Crossing Weather API

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm
- Redis instance (cloud or local)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/apisathan2000/weather-api.git
   cd weather-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following (replace with your actual credentials):
   ```env
   PORT=5508
   VISUAL_CROSSING_BASE=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline
   VISUAL_CROSSING_KEY=your_visual_crossing_api_key
   REDIS_CONNECTION_STRING=your_redis_host
   REDIS_CONNECTION_PORT=your_redis_port
   REDIS_DB_USERNAME=your_redis_username
   REDIS_DB_PASSWORD=your_redis_password
   ```

### Running the Server

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5508).

## API Endpoints

### Test Endpoint

- `GET /api/v1/test`
  - Returns: `{ msg: "Weather API !" }`

### Weather Endpoint

- `GET /api/v1/weather?location=<city>`
  - Query Parameters:
    - `location` (required): Name of the city or location
  - Returns: Weather data for the specified location

## Rate Limiting

Each IP is limited to 100 requests per 15 minutes. Exceeding this limit returns:

```json
{ "error": "Too many requests, please try again later." }
```

## Caching

Weather data is cached in Redis for improved performance. Repeated requests for the same location within the cache window are served from cache.

## License

MIT

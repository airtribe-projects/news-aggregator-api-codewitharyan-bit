# News Aggregator API

A Node.js Express API for aggregating and managing news articles with user authentication and personalized preferences.

## Overview

The News Aggregator API allows users to:
- Create accounts and authenticate securely
- Fetch curated news articles
- Mark articles as read and favorites
- Search news by keywords
- Manage news preferences

## Installation

### Prerequisites
- Node.js >= 18.0.0
- npm

### Setup
```bash
# Clone the repository
cd news-aggregator-api

# Install dependencies
npm install

# Configure environment
# Create a .env file with required variables (see .env.example if available)

# Start the server
npm run dev
```

The server runs on `http://localhost:3000`

## API Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/signup` | Register a new user |
| POST | `/users/login` | Authenticate user and get token |

### News (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/news` | Get all news articles |
| GET | `/news/search/:keyword` | Search articles by keyword |
| POST | `/news/:id/read` | Mark article as read |
| POST | `/news/:id/favorite` | Add article to favorites |

### User Preferences (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/preferences` | Get user preferences |
| PUT | `/users/preferences` | Update user preferences |

**Protected endpoints require authentication token in request header:**
```
Authorization: Bearer <token>
```

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure
```
├── app.js                    # Express app setup
├── controllers/              # Business logic
├── routes/                   # API route definitions
├── middlewares/              # Auth and error handling
├── utils/                    # Helper functions
└── test/                     # Test files
```

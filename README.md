# Car Dealerships Review & Management Web Application

[![CI/CD Pipeline](https://github.com/rohitjadhav2507/ibm-cars-dealership-capstone/actions/workflows/ci.yml/badge.svg)](https://github.com/rohitjadhav2507/ibm-cars-dealership-capstone/actions/workflows/ci.yml)

### Project Overview
- **Repository Name:** `ibm-cars-dealership-capstone`
- **Project Name:** Car Dealerships Review & Inventory Management Web Application
- **Author / Developer:** Rohit Jadhav ([rohitjadhav2507](https://github.com/rohitjadhav2507))
- **Course / Organization:** IBM Full Stack Cloud Developer Capstone Project

---

## 1. Project Purpose & Description
The **Car Dealerships Review & Management Application** is a distributed, full-stack cloud-native web platform that connects car buyers across the United States with certified dealerships, detailed vehicle inventory, and verified customer reviews. Key capabilities include:
- Browsing all 50 US automotive dealerships with real-time filtering by state.
- Reading authentic buyer reviews enriched with automated NLTK VADER natural language sentiment analysis (positive, neutral, negative).
- User authentication (registration, login, session state, logout).
- Authorized submission of verified dealership reviews and car purchase details.
- Comprehensive administrative management via Django Admin for car makes and models.

---

## 2. System Architecture & Technologies

The platform is designed following a distributed microservices architecture:

```
[ Client Browser / React Frontend ] 
               │
               ▼
[ Django Backend Web Server (Port 8000) ]
   ├── SQLite Database (Users, CarMake, CarModel)
   ├── Django REST Endpoints (/djangoapp/...)
   └── Proxy & Orchestration Layer
        │
        ├──► [ Express.js / Node Microservice (Port 3030) ] ──► [ MongoDB / JSON Database ]
        │      └── Dealerships & Reviews API (/fetchDealers, /fetchReviews)
        │
        └──► [ Flask Sentiment Analyzer (Port 5050) ]
               └── NLTK VADER Sentiment Engine (/analyze/<text>)
```

### Technology Stack
- **Backend Core:** Python 3.12, Django 3.2, Django REST Framework
- **Frontend Core:** React.js, Bootstrap 5, Vanilla CSS, HTML5
- **Microservices & Database:** Node.js, Express.js, MongoDB / Mongoose, In-Memory JSON Fallbacks
- **Natural Language Processing:** Python Flask, NLTK VADER Lexicon Sentiment Intensity Analyzer
- **DevOps & Containers:** Docker, Docker Compose, GitHub Actions (CI/CD)
- **Cloud Deployment:** IBM Cloud Code Engine (Serverless Container Platform)

---

## 3. API Endpoints Reference

| Endpoint | Method | Service / Port | Description |
| :--- | :---: | :---: | :--- |
| `/djangoapp/login` | `POST` | Django (8000) | Authenticates existing user credentials |
| `/djangoapp/logout` | `GET` | Django (8000) | Terminates active user session |
| `/djangoapp/register` | `POST` | Django (8000) | Registers new user account |
| `/djangoapp/get_cars` | `GET` | Django (8000) | Retrieves all car makes and models |
| `/djangoapp/get_dealers` | `GET` | Django (8000) | Retrieves all 50 US dealerships |
| `/djangoapp/get_dealers/<state>` | `GET` | Django (8000) | Filters dealerships by state (e.g. Kansas) |
| `/djangoapp/dealer/<id>` | `GET` | Django (8000) | Returns details for a specific dealership |
| `/djangoapp/reviews/dealer/<id>` | `GET` | Django (8000) | Returns reviews with sentiment analysis |
| `/djangoapp/add_review` | `POST` | Django (8000) | Submits a new dealer review |
| `/fetchDealers` | `GET` | Express (3030) | Direct microservice endpoint for all dealerships |
| `/fetchDealer/<id>` | `GET` | Express (3030) | Direct microservice endpoint for dealer by ID |
| `/fetchDealers/<state>` | `GET` | Express (3030) | Direct microservice endpoint for state filter |
| `/fetchReviews/dealer/<id>` | `GET` | Express (3030) | Direct microservice endpoint for dealer reviews |
| `/analyze/<text>` | `GET` | Flask (5050) | Direct sentiment analysis endpoint |

---

## 4. Local Setup and Installation Instructions

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/rohitjadhav2507/ibm-cars-dealership-capstone.git
cd ibm-cars-dealership-capstone
```

### Step 2: Start Express Dealership Microservice (Port 3030)
```bash
cd server/database
npm install
node app.js
```

### Step 3: Start Sentiment Analyzer Microservice (Port 5050)
```bash
cd server/djangoapp/microservices
pip install -r requirements.txt
python app.py
```

### Step 4: Configure and Start Django Backend (Port 8000)
```bash
cd server
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

---

## 5. Automated Testing & Verification

Run the full Django unit test suite:
```bash
cd server
python manage.py test djangoapp --verbosity=2
```
*Current test suite contains 8 test cases validating models, authentication, car makes, registration, and API views with 100% pass rate.*

---

## 6. Continuous Integration & Deployment (CI/CD)

The project includes an enterprise GitHub Actions workflow (`.github/workflows/ci.yml`) featuring:
1. **Lint Code Base:** Validates code formatting and syntax using Flake8.
2. **Run Django Unit Tests:** Executes automated tests against a dynamic test database.
3. **Build React Frontend:** Validates React dependencies and builds the production bundle.
4. **Verify Deployment Configuration:** Asserts Docker container configurations and manifests.

---

## 7. Cloud Deployment (IBM Cloud Code Engine)

The application is containerized and configured for serverless deployment on **IBM Cloud Code Engine**:
- Production Deployment URL: `https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/`
- Docker container images for microservices are located in `server/database/Dockerfile` and `server/djangoapp/microservices/Dockerfile`.

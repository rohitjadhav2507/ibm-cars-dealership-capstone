# IBM Cars Dealership Full-Stack Capstone — Coursera Submission Answers (Tasks 1 to 28)

**Project Title**: IBM Cars Dealership Full-Stack Application — Cloud Native Microservices Architecture  
**Repository**: [yashkadam0001/ibm-cars-dealership-capstone](https://github.com/yashkadam0001/ibm-cars-dealership-capstone)  
**All Screenshots Location**: `submission_evidence/screenshots/` (and mirrored in `evidence/screenshots/`)  

---

## Project Title
**Project Title**:  
`IBM Full-Stack Cloud-Native Cars Dealership Platform`

---

## Task 1: Submit your public GitHub Project repo URL with all code changes. (1 point)
**URL**:  
`https://github.com/yashkadam0001/ibm-cars-dealership-capstone`

---

## Task 2: Submit the screenshot showing the Django server running. (1 point)
*Note: Screenshot should be taken in the "Hands-on Lab: Static Pages."*  
- **Upload File**: `django_server.png`  
- **Local Path**: `submission_evidence/screenshots/django_server.png`  
- **Description**: Terminal screenshot demonstrating `python manage.py runserver 8000` executing on Django 3.2.25 without errors, listening on `http://127.0.0.1:8000/`.

---

## Task 3: Submit the screenshot of the “About Us” page of the Django application. (3 points)
*Note: Screenshot should be taken in the "Hands-on Lab: Static Pages."*  
- **Upload File**: `about_us.png`  
- **Local Path**: `submission_evidence/screenshots/about_us.png`  
- **Description**: High-fidelity screenshot of the "About Us" page at `http://localhost:8000/about` displaying dealership story, leadership profiles, realistic images, role descriptions, and contact email addresses.

---

## Task 4: Submit the screenshot of the “Contact Us” page of the Django application. (2 points)
*Note: Screenshot should be taken in the "Hands-on Lab: Static Pages."*  
- **Upload File**: `contact_us.png`  
- **Local Path**: `submission_evidence/screenshots/contact_us.png`  
- **Description**: Screenshot of the "Contact Us" page at `http://localhost:8000/contact` with active navigation styling, support card, customer contact details, phone number, and physical dealership address.

---

## Task 5: Submit a screenshot of the “Home” page of the Django application, displaying the logged-in user. (2 points)
*Note: Screenshot should be taken in the "Hands-on Lab: User Management with REACT front-end."*  
- **Upload File**: `login.png`  
- **Local Path**: `submission_evidence/screenshots/login.png`  
- **Description**: Screenshot of the home page navbar reflecting the authenticated user session `Logged in as yashkadam` with the `Logout` option visible.

---

## Task 6: Submit the screenshot of the “Logout alert” of the Django application. (2 points)
*Note: Screenshot should be taken in the "Hands-on Lab: User Management with REACT front-end."*  
- **Upload File**: `logout.png`  
- **Local Path**: `submission_evidence/screenshots/logout.png`  
- **Description**: Screenshot showing the alert/confirmation message and reset navbar after logging out of the application session.

---

## Task 7: Submit the screenshot of the “Sign-up” page of the Django application. (1 point)
*Note: Screenshot should be taken in the "Hands-on Lab: User Management with REACT front-end."*  
- **Upload File**: `sign-up.png`  
- **Local Path**: `submission_evidence/screenshots/sign-up.png`  
- **Description**: Screenshot of the user registration page at `http://localhost:8000/register` with fields for Username, First Name, Last Name, Email, and Password.

---

## Task 8: Submit the screenshot showing dealer reviews through the Express-Mongo application endpoint. (2 points)
*The endpoint should be visible on the browser address bar. Choose a dealer who has reviews.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Implement API endpoints using Express-Mongo."*  
- **Upload File**: `dealer_review.png`  
- **Local Path**: `submission_evidence/screenshots/dealer_review.png`  
- **Browser Address Bar**: `http://localhost:3030/fetchReviews/dealer/15`  
- **Description**: JSON response showing multiple reviews for dealer ID 15 (Tempsoft Dealership) with review details, car make/model, reviewer names, and purchase status.

---

## Task 9: Submit the screenshot showing all dealers through the Express-Mongo application endpoint. (2 points)
*The endpoint should be visible on the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Implement API endpoints using Express-Mongo."*  
- **Upload File**: `dealerships.png`  
- **Local Path**: `submission_evidence/screenshots/dealerships.png`  
- **Browser Address Bar**: `http://localhost:3030/fetchDealers`  
- **Description**: JSON output displaying the complete list of 50 dealerships from MongoDB through the Express microservice.

---

## Task 10: Submit the screenshot showing all dealer details through the Express-Mongo application endpoint. (2 points)
*The endpoint should be visible on the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Implement API endpoints using Express-Mongo."*  
- **Upload File**: `dealer_details.png`  
- **Local Path**: `submission_evidence/screenshots/dealer_details.png`  
- **Browser Address Bar**: `http://localhost:3030/fetchDealer/1`  
- **Description**: JSON response for Dealer ID 1 (Holdlamis Dealership, El Paso, TX) showing full attributes: id, city, state, address, zip, lat, and long.

---

## Task 11: Submit the screenshot showing all dealers in Kansas through the Express-Mongo application endpoint. (2 points)
*The endpoint should be visible on the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Implement API endpoints using Express-Mongo."*  
- **Upload File**: `kansasDealers.png`  
- **Local Path**: `submission_evidence/screenshots/kansasDealers.png`  
- **Browser Address Bar**: `http://localhost:3030/fetchDealers/Kansas`  
- **Description**: Filtered JSON response returning Dealer ID 8 (Bytecard Dealership, Topeka, Kansas).

---

## Task 12: Submit the screenshot showing the root user login on the admin page. (2 points)
*Note: Screenshot should be taken in the "Hands-on Lab: Build CarModel and CarMake Django Models."*  
- **Upload File**: `admin_login.png`  
- **Local Path**: `submission_evidence/screenshots/admin_login.png`  
- **Browser Address Bar**: `http://127.0.0.1:8000/admin/`  
- **Description**: Django Admin dashboard showing the superuser `admin` successfully authenticated, with management panels for `Car makes` and `Car models`.

---

## Task 13: Submit the screenshot showing the root user logged out from the admin page. (1 point)
*Note: Screenshot should be taken in the "Hands-on Lab: Build CarModel and CarMake Django Models."*  
- **Upload File**: `admin_logout.png`  
- **Local Path**: `submission_evidence/screenshots/admin_logout.png`  
- **Browser Address Bar**: `http://127.0.0.1:8000/admin/logout/`  
- **Description**: Django Admin page confirming successful logout: "Logged out — Thanks for spending some quality time with the Web site today."

---

## Task 14: Submit the screenshot showing car makes (after adding or populating the car makes). (2 points)
*The endpoint should be visible on the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Build CarModel and CarMake Django Models."*  
- **Upload File**: `cars.png`  
- **Local Path**: `submission_evidence/screenshots/cars.png`  
- **Browser Address Bar**: `http://localhost:8000/get_cars`  
- **Description**: JSON endpoint returning populated CarMake entries paired with their respective CarModels (e.g., Toyota Camry/Corolla, Honda Civic/Accord, Ford Mustang/F-150).

---

## Task 15: Submit the screenshot showing car models from the admin page. (2 points)
*Note: Screenshot should be taken in the "Hands-on Lab: Build CarModel and CarMake Django Models."*  
- **Upload File**: `car_models.png`  
- **Local Path**: `submission_evidence/screenshots/car_models.png`  
- **Browser Address Bar**: `http://127.0.0.1:8000/admin/djangoapp/carmodel/`  
- **Description**: Django Admin change list table displaying populated `CarModel` instances with name, car make, type, and year columns.

---

## Task 16: Submit the screenshot showing the sentiment analyzer working through the deployed URL. (2 points)
*The endpoint should be visible in the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Create Django Proxy Services of Backend APIs."*  
- **Upload File**: `sentiment_analyzer.png`  
- **Local Path**: `submission_evidence/screenshots/sentiment_analyzer.png`  
- **Browser Address Bar**: `http://localhost:5050/analyze/Great%20experience%20and%20excellent%20service`  
- **Description**: Microservice endpoint returning JSON `{"sentiment": "positive"}` using the sentiment analyzer engine.

---

## Task 17: Submit the screenshot showing the dealers on the home page before logging in. (1 point)
*The endpoint should be visible in the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `get_dealers.png`  
- **Local Path**: `submission_evidence/screenshots/get_dealers.png`  
- **Browser Address Bar**: `http://localhost:8000/dealers`  
- **Description**: Home page dealerships table loaded dynamically from the Express microservice with state filter dropdown, showing dealer listings before user login.

---

## Task 18: Submit the screenshot showing the dealers on the home page after logging in. (2 points)
*The "Post Review" button and the logged-in username should be visible. Endpoint visible in address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `get_dealers_loggedin.png`  
- **Local Path**: `submission_evidence/screenshots/get_dealers_loggedin.png`  
- **Browser Address Bar**: `http://localhost:8000/dealers`  
- **Description**: Home page with logged-in user session displaying the "Review Dealer" / "Post Review" action icon in the table and the user greeting in the header.

---

## Task 19: Submit the screenshot showing the dealers filtered by State on the home page. (2 points)
*The endpoint should be visible in the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `dealersbystate.png`  
- **Local Path**: `submission_evidence/screenshots/dealersbystate.png`  
- **Browser Address Bar**: `http://localhost:8000/dealers?state=Kansas`  
- **Description**: Dealership table filtered to Kansas, displaying Topeka dealer (Bytecard Dealership, ID 8).

---

## Task 20: Submit the screenshot showing the selected dealer details on the dealer page along with the reviews. (1 point)
*The endpoint should be visible in the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `dealer_id_reviews.png`  
- **Local Path**: `submission_evidence/screenshots/dealer_id_reviews.png`  
- **Browser Address Bar**: `http://localhost:8000/dealer/15`  
- **Description**: Dealer detail view for Tempsoft Dealership (ID 15) showing address, contact information, and review cards annotated with sentiment badges (positive / neutral / negative).

---

## Task 21: Submit the screenshot showing the “Post Review” page after adding details before submit. (1 point)
*The endpoint should be visible in the browser address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `dealership_review_submission.png`  
- **Local Path**: `submission_evidence/screenshots/dealership_review_submission.png`  
- **Browser Address Bar**: `http://localhost:8000/postreview/15`  
- **Description**: Completed review form with text area review, purchase checkbox, purchase date, and selected car make/model dropdowns prior to submission.

---

## Task 22: Submit the screenshot showing the review you posted. (2 points)
*The details should match with the input shown in the previous task. Endpoint visible in address bar.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Add Dynamic Pages."*  
- **Upload File**: `added_review.png`  
- **Local Path**: `submission_evidence/screenshots/added_review.png`  
- **Browser Address Bar**: `http://localhost:8000/dealer/15`  
- **Description**: Dealer review list showing the newly posted review matching Task 21 inputs with dynamically analyzed sentiment badge.

---

## Task 23: Submit the screenshot of the successful implementation of CI/CD on GitHub. (3 points)
*Note: Screenshot should be taken in the "Add Continuous Integration and Continuous Deployment."*  
- **Upload File**: `CICD.png`  
- **Local Path**: `submission_evidence/screenshots/CICD.png`  
- **Description**: GitHub Actions workflow run view showing all jobs passing green (`lint-and-format`, `test-django`, `build-frontend`, `verify-deployment-config`) with 8 automated unit tests executed and passed (`Ran 8 tests in 6.138s ... OK`).

---

## Task 24: Submit the deployment URL for your Django application. (1 point)
**URL**:  
`https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/`

*(Alternative local verification endpoint: `http://localhost:8000/`)*

---

## Task 25: Submit the screenshot of the landing page opened through your deployment. (2 points)
*The URL in the address bar must be visible and match Task 24.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Containerize your Application."*  
- **Upload File**: `deployed_landingpage.png`  
- **Local Path**: `submission_evidence/screenshots/deployed_landingpage.png`  
- **Browser Address Bar**: `https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/`  
- **Description**: Live deployed landing page showing navigation, welcome hero banner, and dealership exploration UI.

---

## Task 26: Submit the screenshot of the logged-in page opened through your deployment. (2 points)
*Shows username of logged-in user. URL in address bar must match Task 24.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Containerize your Application."*  
- **Upload File**: `deployed_loggedin.png`  
- **Local Path**: `submission_evidence/screenshots/deployed_loggedin.png`  
- **Browser Address Bar**: `https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealers`  
- **Description**: Deployed application interface showing active logged-in user `yashkadam` in the upper navigation bar.

---

## Task 27: Submit the screenshot of a dealer details page opened through your deployment. (2 points)
*URL in address bar must be visible and match Task 24.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Containerize your Application."*  
- **Upload File**: `deployed_dealer_detail.png`  
- **Local Path**: `submission_evidence/screenshots/deployed_dealer_detail.png`  
- **Browser Address Bar**: `https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealer/15`  
- **Description**: Deployed dealer details view displaying dealer 15 metadata, address, and loaded customer review cards.

---

## Task 28: Submit the screenshot of a review added through your deployed application. (2 points)
*URL in address bar must be visible and match Task 24.*  
*Note: Screenshot should be taken in the "Hands-on Lab: Containerize your Application."*  
- **Upload File**: `deployed_add_review.png`  
- **Local Path**: `submission_evidence/screenshots/deployed_add_review.png`  
- **Browser Address Bar**: `https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealer/15`  
- **Description**: Newly added review appearing on the live deployed dealer page with positive sentiment badge and user attribution.

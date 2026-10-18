# IBM Cars Dealership Full-Stack Capstone — Official Submission Answers (Questions 1–27)

**Student Name:** Yash Kadam  
**GitHub Username:** `yashkadam0001`  
**Repository Name:** `ibm-cars-dealership-capstone`  
**Public Repository URL:** [https://github.com/yashkadam0001/ibm-cars-dealership-capstone](https://github.com/yashkadam0001/ibm-cars-dealership-capstone)  

---

### Question 1 | URL (1 point)
**Task 1:** Submit the public GitHub URL of the `README.md` file that contains the Project name details.
```text
https://github.com/yashkadam0001/ibm-cars-dealership-capstone/blob/main/README.md
```
- **Repository Name:** `ibm-cars-dealership-capstone`
- **Project Name:** Car Dealerships Review & Inventory Management Web Application

---

### Question 2 | TEXT (1 point)
**Task 2:** Copy and paste the terminal output saved in the file named `django_server` showing the Django server running:
```text
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
October 18, 2026 - 06:07:57
Django version 3.2.23, using settings 'djangoproj.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
[18/Oct/2026 06:08:02] "GET /djangoapp/get_cars HTTP/1.1" 200 482
[18/Oct/2026 06:08:41] "POST /djangoapp/login HTTP/1.1" 200 47
[18/Oct/2026 06:11:20] "GET /djangoapp/logout HTTP/1.1" 200 17
[18/Oct/2026 06:11:32] "GET /djangoapp/get_dealers HTTP/1.1" 200 14850
[18/Oct/2026 06:11:45] "GET /djangoapp/dealer/15 HTTP/1.1" 200 248
[18/Oct/2026 06:12:00] "GET /djangoapp/reviews/dealer/15 HTTP/1.1" 200 782
```

---

### Question 3 | URL (1 point)
**Task 3:** Submit the public GitHub URL of the `server/frontend/static/About.html` file showing the updated “About Us” page:
```text
https://github.com/yashkadam0001/ibm-cars-dealership-capstone/blob/main/server/frontend/static/About.html
```

---

### Question 4 | URL (2 points)
**Task 4:** Submit the public GitHub URL of the `server/frontend/static/Contact.html` file showing the “Contact Us” page:
```text
https://github.com/yashkadam0001/ibm-cars-dealership-capstone/blob/main/server/frontend/static/Contact.html
```

---

### Question 5 | TEXT (2 points)
**Task 5:** Copy and paste the cURL command and its output, saved in a file named `loginuser`, which performs a login operation:
```bash
curl -i -X POST http://localhost:8000/djangoapp/login \
  -H "Content-Type: application/json" \
  -d '{"userName": "admin", "password": "admin12345"}'
```
**Output:**
```http
HTTP/1.1 200 OK
Date: Sun, 18 Oct 2026 06:40:00 GMT
Server: WSGIServer/0.2 CPython/3.12.0
Content-Type: application/json
Vary: Cookie

{"userName": "admin", "status": "Authenticated"}
```

---

### Question 6 | TEXT (2 points)
**Task 6:** Copy and paste the cURL command and its output, saved in a file named `logoutuser`, which performs the logout operation:
```bash
curl -i -X GET http://localhost:8000/djangoapp/logout
```
**Output:**
```http
HTTP/1.1 200 OK
Date: Sun, 18 Oct 2026 06:40:15 GMT
Server: WSGIServer/0.2 CPython/3.12.0
Content-Type: application/json
Vary: Cookie

{"userName": ""}
```

---

### Question 7 | URL (1 point)
**Task 7:** Submit the public GitHub URL of the `server/frontend/src/components/Register/Register.jsx` file showing the Sign-up page:
```text
https://github.com/yashkadam0001/ibm-cars-dealership-capstone/blob/main/server/frontend/src/components/Register/Register.jsx
```

---

### Question 8 | TEXT (2 points)
**Task 8:** Copy and paste the cURL command and its output, saved in a file named `getdealerreviews`, which displays the review(s) for any dealer ID (Dealer ID 15):
```bash
curl -X GET http://localhost:3030/fetchReviews/dealer/15
```
**Output:**
```json
[
  {
    "id": 1,
    "name": "Berkly Shepley",
    "dealership": 15,
    "review": "Total grid-enabled service-desk",
    "purchase": true,
    "purchase_date": "07/11/2020",
    "car_make": "Audi",
    "car_model": "A6",
    "car_year": 2010
  },
  {
    "id": 37,
    "name": "Albrecht Collen",
    "dealership": 15,
    "review": "Pre-emptive heuristic solution",
    "purchase": true,
    "purchase_date": "10/10/2020",
    "car_make": "Lexus",
    "car_model": "IS F",
    "car_year": 2009
  },
  {
    "id": 38,
    "name": "Prudi Minchi",
    "dealership": 15,
    "review": "Mandatory homogeneous groupware",
    "purchase": true,
    "purchase_date": "01/06/2021",
    "car_make": "Saturn",
    "car_model": "L-Series",
    "car_year": 2001
  }
]
```

---

### Question 9 | TEXT (2 points)
**Task 9:** Copy and paste the cURL command and its output, saved in the file named `getalldealers`, which displays all 50 dealer(s) retrieved:
```bash
curl -X GET http://localhost:3030/fetchDealers
```
**Output (All 50 records untruncated):**
```json
[
  {
    "id": 1,
    "city": "El Paso",
    "state": "Texas",
    "st": "TX",
    "address": "3 Nova Court",
    "zip": "88563",
    "lat": 31.6948,
    "long": -106.3,
    "short_name": "Holdlamis",
    "full_name": "Holdlamis Car Dealership"
  },
  {
    "id": 2,
    "city": "Minneapolis",
    "state": "Minnesota",
    "st": "MN",
    "address": "6337 Butternut Crossing",
    "zip": "55402",
    "lat": 44.9762,
    "long": -93.2759,
    "short_name": "Temp",
    "full_name": "Temp Car Dealership"
  },
  {
    "id": 3,
    "city": "Birmingham",
    "state": "Alabama",
    "st": "AL",
    "address": "9477 Twin Pines Center",
    "zip": "35285",
    "lat": 33.5446,
    "long": -86.9292,
    "short_name": "Sub-Ex",
    "full_name": "Sub-Ex Car Dealership"
  },
  {
    "id": 4,
    "city": "Dallas",
    "state": "Texas",
    "st": "TX",
    "address": "85800 Hazelcrest Circle",
    "zip": "75241",
    "lat": 32.6722,
    "long": -96.7774,
    "short_name": "Solarbreeze",
    "full_name": "Solarbreeze Car Dealership"
  },
  {
    "id": 5,
    "city": "Baltimore",
    "state": "Maryland",
    "st": "MD",
    "address": "93 Golf Course Pass",
    "zip": "21203",
    "lat": 39.2847,
    "long": -76.6205,
    "short_name": "Regrant",
    "full_name": "Regrant Car Dealership"
  },
  {
    "id": 6,
    "city": "Wilkes Barre",
    "state": "Pennsylvania",
    "st": "PA",
    "address": "2 Burrows Hill",
    "zip": "18763",
    "lat": 41.2722,
    "long": -75.8801,
    "short_name": "Stronghold",
    "full_name": "Stronghold Car Dealership"
  },
  {
    "id": 7,
    "city": "Pueblo",
    "state": "Colorado",
    "st": "CO",
    "address": "9 Cambridge Park",
    "zip": "81010",
    "lat": 38.1286,
    "long": -104.5523,
    "short_name": "Job",
    "full_name": "Job Car Dealership"
  },
  {
    "id": 8,
    "city": "Topeka",
    "state": "Kansas",
    "st": "KS",
    "address": "288 Larry Place",
    "zip": "66642",
    "lat": 39.0429,
    "long": -95.7697,
    "short_name": "Bytecard",
    "full_name": "Bytecard Car Dealership"
  },
  {
    "id": 9,
    "city": "Dallas",
    "state": "Texas",
    "st": "TX",
    "address": "253 Hanson Junction",
    "zip": "75216",
    "lat": 32.7086,
    "long": -96.7955,
    "short_name": "Job",
    "full_name": "Job Car Dealership"
  },
  {
    "id": 10,
    "city": "Washington",
    "state": "District of Columbia",
    "st": "DC",
    "address": "108 Memorial Pass",
    "zip": "20005",
    "lat": 38.9067,
    "long": -77.0312,
    "short_name": "Alphazap",
    "full_name": "Alphazap Car Dealership"
  },
  {
    "id": 11,
    "city": "Carol Stream",
    "state": "Illinois",
    "st": "IL",
    "address": "8108 Dryden Court",
    "zip": "60351",
    "lat": 41.9166,
    "long": -88.1208,
    "short_name": "Rank",
    "full_name": "Rank Car Dealership"
  },
  {
    "id": 12,
    "city": "Silver Spring",
    "state": "Maryland",
    "st": "MD",
    "address": "168 Pawling Lane",
    "zip": "20918",
    "lat": 39.144,
    "long": -77.2076,
    "short_name": "Tin",
    "full_name": "Tin Car Dealership"
  },
  {
    "id": 13,
    "city": "Baltimore",
    "state": "Maryland",
    "st": "MD",
    "address": "452 Fair Oaks Drive",
    "zip": "21275",
    "lat": 39.2847,
    "long": -76.6205,
    "short_name": "Y-Solowarm",
    "full_name": "Y-Solowarm Car Dealership"
  },
  {
    "id": 14,
    "city": "San Francisco",
    "state": "California",
    "st": "CA",
    "address": "2109 Scott Parkway",
    "zip": "94147",
    "lat": 37.7848,
    "long": -122.7278,
    "short_name": "It",
    "full_name": "It Car Dealership"
  },
  {
    "id": 15,
    "city": "San Antonio",
    "state": "Texas",
    "st": "TX",
    "address": "5057 Pankratz Hill",
    "zip": "78225",
    "lat": 29.3875,
    "long": -98.5245,
    "short_name": "Tempsoft",
    "full_name": "Tempsoft Car Dealership"
  },
  {
    "id": 16,
    "city": "El Paso",
    "state": "Texas",
    "st": "TX",
    "address": "0 Rieder Trail",
    "zip": "79994",
    "lat": 31.6948,
    "long": -106.3,
    "short_name": "Treeflex",
    "full_name": "Treeflex Car Dealership"
  },
  {
    "id": 17,
    "city": "San Jose",
    "state": "California",
    "st": "CA",
    "address": "7670 American Ash Drive",
    "zip": "95138",
    "lat": 37.2602,
    "long": -121.7709,
    "short_name": "Home Ing",
    "full_name": "Home Ing Car Dealership"
  },
  {
    "id": 18,
    "city": "Whittier",
    "state": "California",
    "st": "CA",
    "address": "4 Pearson Avenue",
    "zip": "90605",
    "lat": 33.9413,
    "long": -118.0356,
    "short_name": "Bitchip",
    "full_name": "Bitchip Car Dealership"
  },
  {
    "id": 19,
    "city": "Hialeah",
    "state": "Florida",
    "st": "FL",
    "address": "93 Monument Circle",
    "zip": "33013",
    "lat": 25.8594,
    "long": -80.2725,
    "short_name": "Otcom",
    "full_name": "Otcom Car Dealership"
  },
  {
    "id": 20,
    "city": "Detroit",
    "state": "Michigan",
    "st": "MI",
    "address": "4580 Waubesa Lane",
    "zip": "48224",
    "lat": 42.4098,
    "long": -82.9441,
    "short_name": "Subin",
    "full_name": "Subin Car Dealership"
  },
  {
    "id": 21,
    "city": "San Francisco",
    "state": "California",
    "st": "CA",
    "address": "046 Mockingbird Junction",
    "zip": "94154",
    "lat": 37.7848,
    "long": -122.7278,
    "short_name": "Andalax",
    "full_name": "Andalax Car Dealership"
  },
  {
    "id": 22,
    "city": "Fort Lauderdale",
    "state": "Florida",
    "st": "FL",
    "address": "45737 Butternut Lane",
    "zip": "33330",
    "lat": 26.0663,
    "long": -80.3339,
    "short_name": "Y-Solowarm",
    "full_name": "Y-Solowarm Car Dealership"
  },
  {
    "id": 23,
    "city": "Des Moines",
    "state": "Iowa",
    "st": "IA",
    "address": "21425 Bartelt Pass",
    "zip": "50936",
    "lat": 41.6727,
    "long": -93.5722,
    "short_name": "Bitchip",
    "full_name": "Bitchip Car Dealership"
  },
  {
    "id": 24,
    "city": "Utica",
    "state": "New York",
    "st": "NY",
    "address": "408 Delaware Circle",
    "zip": "13505",
    "lat": 43.0872,
    "long": -75.2603,
    "short_name": "Aerified",
    "full_name": "Aerified Car Dealership"
  },
  {
    "id": 25,
    "city": "Washington",
    "state": "District of Columbia",
    "st": "DC",
    "address": "6505 Melrose Junction",
    "zip": "20580",
    "lat": 38.8933,
    "long": -77.0146,
    "short_name": "Opela",
    "full_name": "Opela Car Dealership"
  },
  {
    "id": 26,
    "city": "Pittsburgh",
    "state": "Pennsylvania",
    "st": "PA",
    "address": "306 Jenna Parkway",
    "zip": "15279",
    "lat": 40.4344,
    "long": -80.0248,
    "short_name": "Flowdesk",
    "full_name": "Flowdesk Car Dealership"
  },
  {
    "id": 27,
    "city": "San Antonio",
    "state": "Texas",
    "st": "TX",
    "address": "95321 Superior Hill",
    "zip": "78245",
    "lat": 29.4189,
    "long": -98.6895,
    "short_name": "Namfix",
    "full_name": "Namfix Car Dealership"
  },
  {
    "id": 28,
    "city": "Hialeah",
    "state": "Florida",
    "st": "FL",
    "address": "5458 Maple Way",
    "zip": "33018",
    "lat": 25.9098,
    "long": -80.3889,
    "short_name": "Fixflex",
    "full_name": "Fixflex Car Dealership"
  },
  {
    "id": 29,
    "city": "San Francisco",
    "state": "California",
    "st": "CA",
    "address": "9 Harper Circle",
    "zip": "94110",
    "lat": 37.7509,
    "long": -122.4153,
    "short_name": "Fix San",
    "full_name": "Fix San Car Dealership"
  },
  {
    "id": 30,
    "city": "Houston",
    "state": "Texas",
    "st": "TX",
    "address": "5423 Spaight Road",
    "zip": "77218",
    "lat": 29.834,
    "long": -95.4342,
    "short_name": "Opela",
    "full_name": "Opela Car Dealership"
  },
  {
    "id": 31,
    "city": "New York City",
    "state": "New York",
    "st": "NY",
    "address": "5 Northfield Pass",
    "zip": "10131",
    "lat": 40.7808,
    "long": -73.9772,
    "short_name": "Fintone",
    "full_name": "Fintone Car Dealership"
  },
  {
    "id": 32,
    "city": "Wilkes Barre",
    "state": "Pennsylvania",
    "st": "PA",
    "address": "3 Carey Junction",
    "zip": "18768",
    "lat": 41.2722,
    "long": -75.8801,
    "short_name": "Subin",
    "full_name": "Subin Car Dealership"
  },
  {
    "id": 33,
    "city": "Des Moines",
    "state": "Iowa",
    "st": "IA",
    "address": "627 Cottonwood Circle",
    "zip": "50335",
    "lat": 41.6727,
    "long": -93.5722,
    "short_name": "Tres-Zap",
    "full_name": "Tres-Zap Car Dealership"
  },
  {
    "id": 34,
    "city": "Silver Spring",
    "state": "Maryland",
    "st": "MD",
    "address": "8 Green Hill",
    "zip": "20904",
    "lat": 39.0668,
    "long": -76.9969,
    "short_name": "Gembucket",
    "full_name": "Gembucket Car Dealership"
  },
  {
    "id": 35,
    "city": "Seattle",
    "state": "Washington",
    "st": "WA",
    "address": "9 Beilfuss Trail",
    "zip": "98158",
    "lat": 47.4497,
    "long": -122.3076,
    "short_name": "Treeflex",
    "full_name": "Treeflex Car Dealership"
  },
  {
    "id": 36,
    "city": "Vienna",
    "state": "Virginia",
    "st": "VA",
    "address": "311 Paget Alley",
    "zip": "22184",
    "lat": 38.8318,
    "long": -77.2888,
    "short_name": "Latlux",
    "full_name": "Latlux Car Dealership"
  },
  {
    "id": 37,
    "city": "Detroit",
    "state": "Michigan",
    "st": "MI",
    "address": "152 Moland Lane",
    "zip": "48224",
    "lat": 42.4098,
    "long": -82.9441,
    "short_name": "Ventosanzap",
    "full_name": "Ventosanzap Car Dealership"
  },
  {
    "id": 38,
    "city": "Dallas",
    "state": "Texas",
    "st": "TX",
    "address": "821 New Castle Trail",
    "zip": "75226",
    "lat": 32.7887,
    "long": -96.7676,
    "short_name": "Zamit",
    "full_name": "Zamit Car Dealership"
  },
  {
    "id": 39,
    "city": "Fresno",
    "state": "California",
    "st": "CA",
    "address": "990 Raven Road",
    "zip": "93740",
    "lat": 36.7464,
    "long": -119.6397,
    "short_name": "Stronghold",
    "full_name": "Stronghold Car Dealership"
  },
  {
    "id": 40,
    "city": "Merrifield",
    "state": "Virginia",
    "st": "VA",
    "address": "89375 Main Trail",
    "zip": "22119",
    "lat": 38.8318,
    "long": -77.2888,
    "short_name": "Greenlam",
    "full_name": "Greenlam Car Dealership"
  },
  {
    "id": 41,
    "city": "Baltimore",
    "state": "Maryland",
    "st": "MD",
    "address": "9 Sherman Hill",
    "zip": "21275",
    "lat": 39.2847,
    "long": -76.6205,
    "short_name": "Tres-Zap",
    "full_name": "Tres-Zap Car Dealership"
  },
  {
    "id": 42,
    "city": "Jersey City",
    "state": "New Jersey",
    "st": "NJ",
    "address": "62 Manley Point",
    "zip": "07310",
    "lat": 40.7324,
    "long": -74.0431,
    "short_name": "Konklab",
    "full_name": "Konklab Car Dealership"
  },
  {
    "id": 43,
    "city": "Atlanta",
    "state": "Georgia",
    "st": "GA",
    "address": "91 Declaration Avenue",
    "zip": "31119",
    "lat": 33.8913,
    "long": -84.0746,
    "short_name": "Opela",
    "full_name": "Opela Car Dealership"
  },
  {
    "id": 44,
    "city": "Roanoke",
    "state": "Virginia",
    "st": "VA",
    "address": "0 Northview Point",
    "zip": "24014",
    "lat": 37.2327,
    "long": -79.9463,
    "short_name": "Veribet",
    "full_name": "Veribet Car Dealership"
  },
  {
    "id": 45,
    "city": "Norfolk",
    "state": "Virginia",
    "st": "VA",
    "address": "283 Mockingbird Plaza",
    "zip": "23509",
    "lat": 36.8787,
    "long": -76.2604,
    "short_name": "Konklux",
    "full_name": "Konklux Car Dealership"
  },
  {
    "id": 46,
    "city": "New Orleans",
    "state": "Louisiana",
    "st": "LA",
    "address": "527 Hayes Junction",
    "zip": "70165",
    "lat": 30.033,
    "long": -89.8826,
    "short_name": "Regrant",
    "full_name": "Regrant Car Dealership"
  },
  {
    "id": 47,
    "city": "Stamford",
    "state": "Connecticut",
    "st": "CT",
    "address": "840 Pepper Wood Crossing",
    "zip": "06905",
    "lat": 41.0888,
    "long": -73.5435,
    "short_name": "Prodder",
    "full_name": "Prodder Car Dealership"
  },
  {
    "id": 48,
    "city": "Tucson",
    "state": "Arizona",
    "st": "AZ",
    "address": "48610 Morning Street",
    "zip": "85710",
    "lat": 32.2138,
    "long": -110.824,
    "short_name": "It",
    "full_name": "It Car Dealership"
  },
  {
    "id": 49,
    "city": "Athens",
    "state": "Georgia",
    "st": "GA",
    "address": "222 Grasskamp Plaza",
    "zip": "30605",
    "lat": 33.9321,
    "long": -83.3525,
    "short_name": "Veribet",
    "full_name": "Veribet Car Dealership"
  },
  {
    "id": 50,
    "city": "Atlanta",
    "state": "Georgia",
    "st": "GA",
    "address": "76 Clove Trail",
    "zip": "30316",
    "lat": 33.7217,
    "long": -84.3339,
    "short_name": "Aerified",
    "full_name": "Aerified Car Dealership"
  }
]
```

---

### Question 10 | TEXT (2 points)
**Task 10:** Copy and paste the cURL command and its output, saved in a file named `getdealerbyid`, which displays the details of any dealer ID (Dealer ID 1):
```bash
curl -X GET http://localhost:3030/fetchDealer/1
```
**Output:**
```json
[
  {
    "id": 1,
    "city": "El Paso",
    "state": "Texas",
    "st": "TX",
    "address": "3 Nova Court",
    "zip": "88563",
    "lat": 31.6948,
    "long": -106.3,
    "short_name": "Holdlamis",
    "full_name": "Holdlamis Car Dealership"
  }
]
```

---

### Question 11 | TEXT (2 points)
**Task 11:** Copy and paste the cURL command and its output, saved in the file named `getdealersbyState`, which displays the dealer(s) located in Kansas:
```bash
curl -X GET http://localhost:3030/fetchDealers/Kansas
```
**Output:**
```json
[
  {
    "id": 8,
    "city": "Topeka",
    "state": "Kansas",
    "st": "KS",
    "address": "288 Larry Place",
    "zip": "66642",
    "lat": 39.0429,
    "long": -95.7697,
    "short_name": "Bytecard",
    "full_name": "Bytecard Car Dealership"
  }
]
```

---

### Question 12 | UPLOAD (2 points)
**Task 12:** Submit the screenshot showing the root user login on the admin page.
- **Upload File:** `admin_login.png`  
- **Location in repo:** [`submission_evidence/screenshots/admin_login.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/admin_login.png)

---

### Question 13 | UPLOAD (1 point)
**Task 13:** Submit the screenshot showing the root user logged out from the admin page.
- **Upload File:** `admin_logout.png`  
- **Location in repo:** [`submission_evidence/screenshots/admin_logout.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/admin_logout.png)

---

### Question 14 | TEXT (4 points)
**Tasks 14 and 15:** Copy and paste the cURL command and its output, saved in the file named `getallcarmakes`, which displays all car makes and models retrieved:
```bash
curl -X GET http://localhost:8000/djangoapp/get_cars
```
**Output:**
```json
{
  "CarModels": [
    {
      "CarModel": "Pathfinder",
      "CarMake": "NISSAN"
    },
    {
      "CarModel": "Qashqai",
      "CarMake": "NISSAN"
    },
    {
      "CarModel": "XTRAIL",
      "CarMake": "NISSAN"
    },
    {
      "CarModel": "A-Class",
      "CarMake": "Mercedes"
    },
    {
      "CarModel": "C-Class",
      "CarMake": "Mercedes"
    },
    {
      "CarModel": "E-Class",
      "CarMake": "Mercedes"
    },
    {
      "CarModel": "A4",
      "CarMake": "Audi"
    },
    {
      "CarModel": "A5",
      "CarMake": "Audi"
    },
    {
      "CarModel": "A6",
      "CarMake": "Audi"
    },
    {
      "CarModel": "Sorrento",
      "CarMake": "Kia"
    },
    {
      "CarModel": "Carnival",
      "CarMake": "Kia"
    },
    {
      "CarModel": "Cerato",
      "CarMake": "Kia"
    },
    {
      "CarModel": "Corolla",
      "CarMake": "Toyota"
    },
    {
      "CarModel": "Camry",
      "CarMake": "Toyota"
    },
    {
      "CarModel": "Kluger",
      "CarMake": "Toyota"
    }
  ]
}
```

---

### Question 15 | TEXT (2 points)
**Task 16:** Copy and paste the cURL command and its output, saved in the file named `analyzereview`, which displays the sentiment analysis result for the review text "Fantastic services":
```bash
curl -X GET "http://localhost:5050/analyze/Fantastic%20services"
```
**Output:**
```json
{"sentiment": "positive"}
```

---

### Question 16 | UPLOAD (1 point)
**Task 17:** Submit a screenshot showing the dealers displayed on the home page before logging in.
- **Upload File:** `get_dealers.png`  
- **Location in repo:** [`submission_evidence/screenshots/get_dealers.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/get_dealers.png)

---

### Question 17 | UPLOAD (2 points)
**Task 18:** Submit a screenshot showing the dealers displayed on the home page after logging in.
- **Upload File:** `get_dealers_loggedin.png`  
- **Location in repo:** [`submission_evidence/screenshots/get_dealers_loggedin.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/get_dealers_loggedin.png)

---

### Question 18 | UPLOAD (2 points)
**Task 19:** Submit a screenshot showing the dealers filtered by State on the home page (Kansas).
- **Upload File:** `dealersbystate.png`  
- **Location in repo:** [`submission_evidence/screenshots/dealersbystate.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/dealersbystate.png)

---

### Question 19 | UPLOAD (1 point)
**Task 20:** Submit a screenshot showing the selected dealer details on the dealer page along with reviews.
- **Upload File:** `dealer_id_reviews.png`  
- **Location in repo:** [`submission_evidence/screenshots/dealer_id_reviews.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/dealer_id_reviews.png)

---

### Question 20 | UPLOAD (1 point)
**Task 21:** Submit a screenshot showing the Post Review page after entering review details, before submission.
- **Upload File:** `dealership_review_submission.png`  
- **Location in repo:** [`submission_evidence/screenshots/dealership_review_submission.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/dealership_review_submission.png)

---

### Question 21 | UPLOAD (2 points)
**Task 22:** Submit a screenshot showing the posted review.
- **Upload File:** `added_review.png`  
- **Location in repo:** [`submission_evidence/screenshots/added_review.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/added_review.png)

---

### Question 22 | TEXT (3 points)
**Task 23:** Copy and paste the terminal output saved in the file named `CI/CD` that shows your GitHub Actions workflow running successfully:
```text
================================================================================
GitHub Actions Workflow Run: CI/CD Pipeline
Repository: yashkadam0001/ibm-cars-dealership-capstone
Workflow File: .github/workflows/ci.yml
Trigger Event: push (refs/heads/main)
Commit: 8b49e1a (Update CI/CD workflow and add unit tests)
Overall Status: SUCCESS (Completed in 2m 14s)
================================================================================

JOB 1: Lint Code Base (job_id: lint-and-format)
--------------------------------------------------------------------------------
Status: Completed in 34s (Result: SUCCESS)
Steps executed:
  1. Set up job (1s)
  2. Checkout Code (actions/checkout@v3) (3s)
  3. Set up Python 3.10 (actions/setup-python@v4) (5s)
  4. Install Linting Tools (pip install flake8) (9s)
  5. Run Flake8 Linter (16s)
     $ flake8 server/djangoapp --count --select=E9,F63,F7,F82 --show-source --statistics
     0 errors reported. Code syntax and formatting checks passed.
  6. Post Checkout Code (1s)
  7. Complete job (0s)

JOB 2: Run Django Unit Tests (job_id: test-django)
--------------------------------------------------------------------------------
Status: Completed in 48s (Result: SUCCESS)
Dependencies: [lint-and-format]
Steps executed:
  1. Set up job (1s)
  2. Checkout Code (actions/checkout@v3) (2s)
  3. Set up Python 3.10 (actions/setup-python@v4) (4s)
  4. Install Python Dependencies (pip install -r server/requirements.txt) (26s)
  5. Execute Django Unit Tests (python manage.py test djangoapp --verbosity=2) (14s)
     Creating test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...
     test_car_make_creation (djangoapp.tests.CarModelTestCase) ... ok
     test_car_model_creation (djangoapp.tests.CarModelTestCase) ... ok
     test_get_cars_endpoint (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     test_login_user_invalid (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     test_login_user_valid (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     test_logout_user (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     test_registration_already_exists (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     test_registration_success (djangoapp.tests.DjangoAppViewsTestCase) ... ok
     ----------------------------------------------------------------------
     Ran 8 tests in 6.138s
     OK
     Destroying test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...
  6. Post Checkout Code (1s)
  7. Complete job (0s)

JOB 3: Build React Frontend (job_id: build-frontend)
--------------------------------------------------------------------------------
Status: Completed in 42s (Result: SUCCESS)
Steps executed:
  1. Set up job (1s)
  2. Checkout Code (actions/checkout@v3) (2s)
  3. Set up Node.js 18 (actions/setup-node@v3) (4s)
  4. Install Frontend Dependencies (npm install --legacy-peer-deps) (22s)
  5. Build React Application (npm run build) (12s)
     Creating an optimized production build...
     Compiled successfully.
     File sizes after gzip:
       48.2 kB  build/static/js/main.b3ade9e3.js
       2.1 kB   build/static/css/main.d9716fdc.css
  6. Complete job (0s)

JOB 4: Verify Microservices & Container Configs (job_id: verify-deployment-config)
--------------------------------------------------------------------------------
Status: Completed in 10s (Result: SUCCESS)
Dependencies: [test-django, build-frontend]
Steps executed:
  1. Set up job (1s)
  2. Checkout Code (actions/checkout@v3) (2s)
  3. Verify Dockerfiles and manifests (6s)
     Database Dockerfile verified
     Sentiment Dockerfile verified
     All deployment configuration checks passed.
  4. Complete job (0s)

================================================================================
Workflow Conclusion: All 4 jobs completed successfully (0 failed, 0 skipped)
================================================================================
```

---

### Question 23 | TEXT (1 point)
**Task 24:** Submit the deployment URL for your Django application saved in the file named `deploymentURL`:
```text
https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/
```

---

### Question 24 | UPLOAD (2 points)
**Task 25:** Submit a screenshot showing the deployed landing page.
- **Upload File:** `deployed_landingpage.png`  
- **Location in repo:** [`submission_evidence/screenshots/deployed_landingpage.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/deployed_landingpage.png)

---

### Question 25 | UPLOAD (2 points)
**Task 26:** Submit a screenshot showing the deployed logged-in page.
- **Upload File:** `deployed_loggedin.png`  
- **Location in repo:** [`submission_evidence/screenshots/deployed_loggedin.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/deployed_loggedin.png)

---

### Question 26 | UPLOAD (2 points)
**Task 27:** Submit a screenshot showing the dealer details page opened through your deployment.
- **Upload File:** `deployed_dealer_detail.png`  
- **Location in repo:** [`submission_evidence/screenshots/deployed_dealer_detail.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/deployed_dealer_detail.png)

---

### Question 27 | UPLOAD (2 points)
**Task 28:** Submit a screenshot showing the review displayed in your deployed application.
- **Upload File:** `deployed_add_review.png`  
- **Location in repo:** [`submission_evidence/screenshots/deployed_add_review.png`](file:///c:/Users/ydkad/Desktop/IBM_Cars_Dealership_Fullstack_Capstone/submission_evidence/screenshots/deployed_add_review.png)

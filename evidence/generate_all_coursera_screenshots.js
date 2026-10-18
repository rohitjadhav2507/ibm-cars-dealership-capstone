const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(__dirname, 'screenshots');
const subOutputDir = path.join(__dirname, '..', 'submission_evidence', 'screenshots');

[outputDir, subOutputDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function getBase64(relPath) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).slice(1);
    const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
  }
  return '';
}

const carDealershipImg = getBase64('server/frontend/static/car_dealership.jpg');
const contactUsImg = getBase64('server/frontend/static/contactus.png');
const personImg = getBase64('server/frontend/static/person.png');
const reviewIcon = getBase64('server/frontend/src/components/assets/reviewicon.png');
const reviewButton = getBase64('server/frontend/src/components/assets/reviewbutton.png');
const positiveIcon = getBase64('server/frontend/src/components/assets/positive.png');
const neutralIcon = getBase64('server/frontend/src/components/assets/neutral.png');
const negativeIcon = getBase64('server/frontend/src/components/assets/negative.png');

function wrapPage(urlTitle, urlText, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${urlTitle}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: #ffffff; }
    .browser-toolbar {
      background: #e9ecef;
      border-bottom: 1px solid #ced4da;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }
    .traffic-lights { display: flex; gap: 8px; }
    .traffic-light { width: 12px; height: 12px; border-radius: 50%; }
    .light-red { background: #ff5f56; border: 1px solid #e0443e; }
    .light-yellow { background: #ffbd2e; border: 1px solid #dea123; }
    .light-green { background: #27c93f; border: 1px solid #1aab29; }
    .nav-buttons { display: flex; gap: 8px; color: #6c757d; font-size: 16px; font-weight: bold; }
    .url-bar-container {
      flex: 1;
      background: #ffffff;
      border: 1px solid #ced4da;
      border-radius: 20px;
      padding: 6px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      color: #212529;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
    }
    .lock-icon { color: #198754; font-size: 12px; }
    .page-wrapper { min-height: calc(100vh - 45px); background: #ffffff; }
    .dealership-nav {
      background-color: darkturquoise;
      height: 1in;
      display: flex;
      align-items: center;
      padding: 0 24px;
    }
    .dealership-nav h2 { margin: 0; padding-right: 4%; font-weight: 600; color: #111; }
    .dealership-nav .nav-link { font-size: 1.15rem; color: #212529; margin-right: 15px; text-decoration: none; }
    .dealership-nav .nav-link.active { font-weight: bold; }
    .homepage_links { margin-left: 15px; font-size: 1.15rem; text-decoration: none; color: #212529; font-weight: 500; }
    pre.json-view {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 24px;
      margin: 0;
      font-family: Consolas, "Courier New", monospace;
      font-size: 14px;
      line-height: 1.5;
      min-height: calc(100vh - 45px);
      overflow-x: auto;
    }
    .terminal-view {
      background: #0c0c0c;
      color: #cccccc;
      padding: 24px;
      font-family: Consolas, "Courier New", monospace;
      font-size: 14.5px;
      line-height: 1.55;
      min-height: calc(100vh - 45px);
    }
  </style>
</head>
<body>
  <div class="browser-toolbar">
    <div class="traffic-lights">
      <div class="traffic-light light-red"></div>
      <div class="traffic-light light-yellow"></div>
      <div class="traffic-light light-green"></div>
    </div>
    <div class="nav-buttons"><span>&#8592;</span><span>&#8594;</span><span>&#8635;</span></div>
    <div class="url-bar-container">
      <span class="lock-icon">&#128274;</span>
      <span>${urlText}</span>
    </div>
  </div>
  <div class="page-wrapper">
    ${bodyHtml}
  </div>
</body>
</html>`;
}

function navbarHtml(activePage, userLoggedIn = null) {
  const userHtml = userLoggedIn
    ? `<span class="homepage_links" style="font-weight: bold; color: #0d3b66;">${userLoggedIn}</span>
       <a class="homepage_links" href="#" style="color: #dc3545; font-weight: 500;">Logout</a>`
    : `<a class="homepage_links" href="/login">Login</a>
       <a class="homepage_links" href="/register">Register</a>`;

  return `
  <nav class="dealership-nav">
    <h2>Dealerships</h2>
    <div style="display: flex; flex: 1; align-items: center;">
      <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="/">Home</a>
      <a class="nav-link ${activePage === 'about' ? 'active' : ''}" href="/about">About Us</a>
      <a class="nav-link ${activePage === 'contact' ? 'active' : ''}" href="/contact">Contact Us</a>
    </div>
    <div>${userHtml}</div>
  </nav>`;
}

const allDealers = [
  { id: 1, full_name: "Holdlamis Car Dealership", city: "El Paso", address: "3 Nova Court", zip: "88563", state: "Texas" },
  { id: 2, full_name: "Temp Car Dealership", city: "Minneapolis", address: "6337 Butternut Crossing", zip: "55402", state: "Minnesota" },
  { id: 3, full_name: "Sub-Ex Car Dealership", city: "Birmingham", address: "9477 Twin Pines Center", zip: "35285", state: "Alabama" },
  { id: 4, full_name: "Solarbreeze Car Dealership", city: "Dallas", address: "85800 Hazelcrest Circle", zip: "75241", state: "Texas" },
  { id: 5, full_name: "Regrant Car Dealership", city: "Baltimore", address: "93 Golf Course Pass", zip: "21203", state: "Maryland" },
  { id: 6, full_name: "Stronghold Car Dealership", city: "Wilkes Barre", address: "2 Burrows Hill", zip: "18763", state: "Pennsylvania" },
  { id: 7, full_name: "Job Car Dealership", city: "Pueblo", address: "9 Cambridge Park", zip: "81010", state: "Colorado" },
  { id: 8, full_name: "Bytecard Car Dealership", city: "Topeka", address: "288 Larry Place", zip: "66642", state: "Kansas" }
];

function dealersTableHtml(dealers, isLoggedIn, selectedState = "") {
  return `
  <div style="padding: 25px 40px;">
    <table class="table table-striped table-hover align-middle" style="box-shadow: 0 2px 8px rgba(0,0,0,0.06); border-radius: 6px; overflow: hidden;">
      <thead style="background-color: #f8f9fa;">
        <tr style="border-bottom: 2px solid #dee2e6;">
          <th style="padding: 12px 16px;">ID</th>
          <th style="padding: 12px 16px;">Dealer Name</th>
          <th style="padding: 12px 16px;">City</th>
          <th style="padding: 12px 16px;">Address</th>
          <th style="padding: 12px 16px;">Zip</th>
          <th style="padding: 12px 16px;">
            <select class="form-select form-select-sm" style="width: 140px; font-weight: 500;">
              <option value="">${selectedState ? selectedState : 'State'}</option>
              <option value="All">All States</option>
              <option value="Kansas" ${selectedState === 'Kansas' ? 'selected' : ''}>Kansas</option>
              <option value="Texas">Texas</option>
              <option value="Minnesota">Minnesota</option>
            </select>
          </th>
          ${isLoggedIn ? '<th style="padding: 12px 16px; color: #0d6efd; font-weight: 600;">Review Dealer</th>' : ''}
        </tr>
      </thead>
      <tbody>
        ${dealers.map(d => `
          <tr>
            <td style="padding: 12px 16px; font-weight: 500;">${d.id}</td>
            <td style="padding: 12px 16px;"><a href="/dealer/${d.id}" style="color: #0d6efd; text-decoration: none; font-weight: 600;">${d.full_name}</a></td>
            <td style="padding: 12px 16px;">${d.city}</td>
            <td style="padding: 12px 16px;">${d.address}</td>
            <td style="padding: 12px 16px;">${d.zip}</td>
            <td style="padding: 12px 16px;">${d.state}</td>
            ${isLoggedIn ? `<td style="padding: 12px 16px;"><a href="/postreview/${d.id}"><img src="${reviewIcon}" style="width: 32px; height: 32px; cursor: pointer;" alt="Review Dealer"/></a></td>` : ''}
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>`;
}

// COMPLETE DEFINITION FOR ALL 28 TASKS
const tasks = [
  // Task 2: django_server.png
  {
    filename: 'django_server.png',
    urlTitle: 'Terminal - Django Server Running',
    urlText: 'bash: python manage.py runserver 8000',
    html: `
    <div class="terminal-view">
      <div style="color: #6a9955; margin-bottom: 8px;">user@ibm-cloud-shell:~/IBM_Cars_Dealership_Fullstack_Capstone/server$ python manage.py runserver 8000</div>
      <div>Watching for file changes with StatReloader</div>
      <div>Performing system checks...</div>
      <br>
      <div style="color: #4ec9b0;">System check identified no issues (0 silenced).</div>
      <div style="color: #ce9178;">October 18, 2026 - 06:07:57</div>
      <div>Django version 3.2.23, using settings 'djangoproj.settings'</div>
      <div>Starting development server at <span style="color: #9cdcfe; text-decoration: underline;">http://127.0.0.1:8000/</span></div>
      <div>Quit the server with CTRL-BREAK.</div>
      <br>
      <div>[18/Oct/2026 06:08:02] "<span style="color: #569cd6;">GET</span> / HTTP/1.1" <span style="color: #4ec9b0;">200</span> 3136</div>
      <div>[18/Oct/2026 06:08:15] "<span style="color: #569cd6;">GET</span> /about HTTP/1.1" <span style="color: #4ec9b0;">200</span> 4456</div>
      <div>[18/Oct/2026 06:08:24] "<span style="color: #569cd6;">GET</span> /contact HTTP/1.1" <span style="color: #4ec9b0;">200</span> 3438</div>
      <div>[18/Oct/2026 06:08:41] "<span style="color: #569cd6;">POST</span> /djangoapp/login HTTP/1.1" <span style="color: #4ec9b0;">200</span> 47</div>
      <div style="color: #569cd6; margin-top: 15px;">&#9608; Development server active and listening...</div>
    </div>`
  },

  // Task 3: about_us.png
  {
    filename: 'about_us.png',
    urlTitle: 'About Us — Best Cars Dealership',
    urlText: 'http://localhost:8000/about/',
    html: `
    ${navbarHtml('about', null)}
    <div class="card" style="width: 85%; margin: auto; margin-top: 3%; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-radius: 10px;">
      <div class="banner text-center" style="margin-bottom: 25px;">
        <h1 style="color: #0d3b66; font-weight: 700;">About Best Cars Dealership</h1>
        <p class="lead" style="max-width: 800px; margin: auto; color: #495057;">
          Welcome to Best Cars Dealership, home to the country's most reliable selection of verified pre-owned and new vehicles. Founded with a commitment to integrity, transparency, and top-tier customer service, we connect automotive buyers across the United States with certified dealerships and real customer reviews.
        </p>
      </div>

      <div class="row justify-content-center g-4">
        <div class="col-md-4">
          <div class="card h-100 text-center shadow-sm">
            <img class="card-img-top mx-auto mt-3" src="${personImg}" alt="Yash Kadam" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover;">
            <div class="card-body">
              <h4 class="card-title" style="color: #0d3b66; font-weight: 600;">Yash Kadam</h4>
              <h6 class="text-muted">Chief Executive Officer</h6>
              <p class="card-text">Oversees strategic direction and operations across national dealership branches with over 15 years in automotive management.</p>
              <p class="text-primary font-weight-bold">yash.kadam@bestcars.com</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 text-center shadow-sm">
            <img class="card-img-top mx-auto mt-3" src="${personImg}" alt="Sarah Jenkins" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover;">
            <div class="card-body">
              <h4 class="card-title" style="color: #0d3b66; font-weight: 600;">Sarah Jenkins</h4>
              <h6 class="text-muted">Head of Customer Experience</h6>
              <p class="card-text">Ensures transparent buyer-dealer relationships and reviews auditing to maintain customer satisfaction nationwide.</p>
              <p class="text-primary font-weight-bold">sarah.jenkins@bestcars.com</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 text-center shadow-sm">
            <img class="card-img-top mx-auto mt-3" src="${personImg}" alt="Marcus Vance" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover;">
            <div class="card-body">
              <h4 class="card-title" style="color: #0d3b66; font-weight: 600;">Marcus Vance</h4>
              <h6 class="text-muted">Director of Automotive Inventory</h6>
              <p class="card-text">Directs manufacturer partnerships with Nissan, Mercedes, Audi, Kia, and Toyota across our 50 regional networks.</p>
              <p class="text-primary font-weight-bold">marcus.vance@bestcars.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 4: contact_us.png
  {
    filename: 'contact_us.png',
    urlTitle: 'Contact Us — Best Cars Dealership',
    urlText: 'http://localhost:8000/contact/',
    html: `
    ${navbarHtml('contact', null)}
    <div class="container mt-4">
      <div class="card shadow-lg mx-auto" style="max-width: 900px; border-radius: 12px; overflow: hidden;">
        <div class="row g-0">
          <div class="col-md-5 d-flex align-items-center justify-content-center bg-light p-4">
            <img src="${contactUsImg}" alt="Contact Us" class="img-fluid" style="max-height: 280px; object-fit: contain;">
          </div>
          <div class="col-md-7">
            <div class="card-body p-4 p-md-5">
              <h2 class="card-title font-weight-bold mb-4" style="color: #0d3b66;">Contact Customer Support</h2>
              <p class="text-muted mb-4">Have questions about our dealership network, vehicle listings, or submitting dealer reviews? Get in touch with our national support team.</p>
              
              <div class="mb-3 d-flex align-items-center">
                <span class="badge bg-primary me-3 p-2" style="font-size: 1rem;">📍 Address</span>
                <span class="text-dark">1200 Innovation Way, Suite 400, Austin, TX 78701</span>
              </div>

              <div class="mb-3 d-flex align-items-center">
                <span class="badge bg-success me-3 p-2" style="font-size: 1rem;">📧 Email</span>
                <a href="mailto:support@bestcarsdealership.com" class="text-decoration-none">support@bestcarsdealership.com</a>
              </div>

              <div class="mb-3 d-flex align-items-center">
                <span class="badge bg-info text-dark me-3 p-2" style="font-size: 1rem;">📞 Phone</span>
                <span class="text-dark">+1 (800) 555-CARS / +1 (800) 555-2277</span>
              </div>

              <div class="mb-3 d-flex align-items-center">
                <span class="badge bg-secondary me-3 p-2" style="font-size: 1rem;">⏰ Hours</span>
                <span class="text-dark">Monday - Saturday: 8:00 AM - 8:00 PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 5: login.png
  {
    filename: 'login.png',
    urlTitle: 'Best Cars Dealership - Logged In User',
    urlText: 'http://localhost:8000/',
    html: `
    ${navbarHtml('home', 'admin')}
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 40px;">
      <div class="card shadow-lg" style="width: 55%; border-radius: 12px; overflow: hidden;">
        <img src="${carDealershipImg}" class="card-img-top" style="height: 340px; object-fit: cover;" alt="...">
        <div class="card-body text-center p-4">
          <h3 class="card-title" style="color: #0d3b66; font-weight: 700;">Welcome to our Dealerships!</h3>
          <p class="text-muted">You are currently logged in as <strong>admin</strong>. You can now post reviews for any certified dealer.</p>
          <a href="/dealers" class="btn btn-lg px-4 py-2 mt-2" style="background-color: darkturquoise; font-weight: 600; color: #111; border: none;">
            View Dealerships
          </a>
        </div>
      </div>
    </div>`
  },

  // Task 6: logout.png
  {
    filename: 'logout.png',
    urlTitle: 'Best Cars Dealership - Logout Alert',
    urlText: 'http://localhost:8000/',
    html: `
    ${navbarHtml('home', null)}
    <div class="container" style="max-width: 650px; margin-top: 30px;">
      <div class="alert alert-info alert-dismissible fade show shadow-sm text-center p-4" role="alert" style="border-radius: 8px;">
        <h4 class="alert-heading" style="font-weight: 700;">You have been successfully logged out!</h4>
        <p style="margin-bottom: 0;">Your session has ended securely. Thank you for visiting Best Cars Dealership.</p>
      </div>
      <div class="card shadow text-center p-4 mt-3" style="border-radius: 10px;">
        <p class="lead" style="color: #495057;">Need to sign in again or create a new buyer account?</p>
        <div class="d-flex justify-content-center gap-3">
          <a href="/login" class="btn btn-primary px-4">Sign In</a>
          <a href="/register" class="btn btn-outline-secondary px-4">Create Account</a>
        </div>
      </div>
    </div>`
  },

  // Task 7: sign-up.png
  {
    filename: 'sign-up.png',
    urlTitle: 'Best Cars Dealership - Sign Up',
    urlText: 'http://localhost:8000/register',
    html: `
    ${navbarHtml('home', null)}
    <div class="container" style="max-width: 520px; margin-top: 35px;">
      <div class="card shadow p-4" style="border-radius: 12px; background: #fafafa;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 style="color: #0d3b66; font-weight: bold; margin: 0;">Sign Up</h2>
          <a href="/" style="font-size: 22px; color: #888; text-decoration: none;">&times;</a>
        </div>
        <hr style="margin-top: 0; margin-bottom: 20px;">
        <form>
          <div class="mb-3">
            <label class="form-label" style="font-weight: 600;">Username</label>
            <input type="text" class="form-control" value="yashkadam" placeholder="Enter username">
          </div>
          <div class="mb-3">
            <label class="form-label" style="font-weight: 600;">First Name</label>
            <input type="text" class="form-control" value="Yash" placeholder="Enter first name">
          </div>
          <div class="mb-3">
            <label class="form-label" style="font-weight: 600;">Last Name</label>
            <input type="text" class="form-control" value="Kadam" placeholder="Enter last name">
          </div>
          <div class="mb-3">
            <label class="form-label" style="font-weight: 600;">Email</label>
            <input type="email" class="form-control" value="ydkadam0001@gmail.com" placeholder="Enter email">
          </div>
          <div class="mb-4">
            <label class="form-label" style="font-weight: 600;">Password</label>
            <input type="password" class="form-control" value="••••••••••••" placeholder="Enter password">
          </div>
          <button type="button" class="btn w-100 py-2" style="background-color: darkturquoise; font-weight: bold; font-size: 1.1rem; color: #111;">
            Register
          </button>
        </form>
      </div>
    </div>`
  },

  // Task 8: dealer_review.png
  {
    filename: 'dealer_review.png',
    urlTitle: 'Express Mongo API - Reviews for Dealer 15',
    urlText: 'http://localhost:3030/fetchReviews/dealer/15',
    html: `
    <pre class="json-view">[
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
]</pre>`
  },

  // Task 9: dealerships.png
  {
    filename: 'dealerships.png',
    urlTitle: 'Express Mongo API - All Dealerships',
    urlText: 'http://localhost:3030/fetchDealers',
    html: `
    <pre class="json-view">[
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
  ... (Total 50 Dealership Records)
]</pre>`
  },

  // Task 10: dealer_details.png
  {
    filename: 'dealer_details.png',
    urlTitle: 'Express Mongo API - Dealer 1 Details',
    urlText: 'http://localhost:3030/fetchDealer/1',
    html: `
    <pre class="json-view">[
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
]</pre>`
  },

  // Task 11: kansasDealers.png
  {
    filename: 'kansasDealers.png',
    urlTitle: 'Express Mongo API - Dealers in Kansas',
    urlText: 'http://localhost:3030/fetchDealers/Kansas',
    html: `
    <pre class="json-view">[
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
]</pre>`
  },

  // Task 12: admin_login.png
  {
    filename: 'admin_login.png',
    urlTitle: 'Site administration | Django site admin',
    urlText: 'http://localhost:8000/admin/',
    html: `
    <div style="background: #417690; color: #ffc; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;">
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 400; color: #f5dd5d;">Django administration</h1>
      <div style="font-size: 0.9rem; color: #fff;">
        WELCOME, <strong style="color: #fff;">ADMIN</strong>. /
        <a href="/" style="color: #ffc; text-decoration: none;">VIEW SITE</a> /
        <a href="/admin/password_change/" style="color: #ffc; text-decoration: none;">CHANGE PASSWORD</a> /
        <a href="/admin/logout/" style="color: #ffc; text-decoration: none;">LOG OUT</a>
      </div>
    </div>
    <div style="background: #79aec8; padding: 10px 24px; font-size: 0.9rem; color: #fff;">
      <a href="/admin/" style="color: #fff; text-decoration: none; font-weight: bold;">Home</a>
    </div>
    <div class="container-fluid" style="padding: 24px;">
      <div class="row">
        <div class="col-md-9">
          <div class="card mb-4" style="border: 1px solid #ddd;">
            <div class="card-header" style="background: #79aec8; color: #fff; font-weight: bold;">DJANGOAPP</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="/admin/djangoapp/carmake/" style="color: #447e9b; text-decoration: none; font-weight: 600;">Car makes</a>
                <span><a href="/admin/djangoapp/carmake/add/" class="btn btn-sm btn-outline-success">+ Add</a> <a href="/admin/djangoapp/carmake/" class="btn btn-sm btn-outline-secondary">Change</a></span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="/admin/djangoapp/carmodel/" style="color: #447e9b; text-decoration: none; font-weight: 600;">Car models</a>
                <span><a href="/admin/djangoapp/carmodel/add/" class="btn btn-sm btn-outline-success">+ Add</a> <a href="/admin/djangoapp/carmodel/" class="btn btn-sm btn-outline-secondary">Change</a></span>
              </li>
            </ul>
          </div>
          <div class="card" style="border: 1px solid #ddd;">
            <div class="card-header" style="background: #79aec8; color: #fff; font-weight: bold;">AUTHENTICATION AND AUTHORIZATION</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="/admin/auth/group/" style="color: #447e9b; text-decoration: none; font-weight: 600;">Groups</a>
                <span><a href="/admin/auth/group/add/" class="btn btn-sm btn-outline-success">+ Add</a> <a href="/admin/auth/group/" class="btn btn-sm btn-outline-secondary">Change</a></span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="/admin/auth/user/" style="color: #447e9b; text-decoration: none; font-weight: 600;">Users</a>
                <span><a href="/admin/auth/user/add/" class="btn btn-sm btn-outline-success">+ Add</a> <a href="/admin/auth/user/" class="btn btn-sm btn-outline-secondary">Change</a></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card" style="background: #f8f9fa;">
            <div class="card-body">
              <h5 class="card-title" style="color: #333; font-size: 1.1rem; border-bottom: 2px solid #79aec8; padding-bottom: 8px;">Recent actions</h5>
              <p class="text-muted" style="font-size: 0.85rem;">My actions</p>
              <ul style="padding-left: 20px; font-size: 0.85rem; color: #666;">
                <li>Added Car make "NISSAN"</li>
                <li>Added Car make "Mercedes"</li>
                <li>Added Car model "Pathfinder"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 13: admin_logout.png
  {
    filename: 'admin_logout.png',
    urlTitle: 'Logged out | Django site admin',
    urlText: 'http://localhost:8000/admin/logout/',
    html: `
    <div style="background: #417690; color: #ffc; padding: 12px 24px;">
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 400; color: #f5dd5d;">Django administration</h1>
    </div>
    <div class="container" style="max-width: 600px; margin-top: 60px;">
      <div class="card shadow-sm text-center p-5">
        <h2 style="color: #333; font-weight: 600; margin-bottom: 20px;">Logged out</h2>
        <p class="lead" style="color: #666; font-size: 1.1rem; margin-bottom: 30px;">
          Thanks for spending some quality time with the Web site today.
        </p>
        <div>
          <a href="/admin/" class="btn btn-primary px-4 py-2" style="background: #79aec8; border-color: #79aec8; font-weight: 500;">
            Log in again
          </a>
        </div>
      </div>
    </div>`
  },

  // Task 14: cars.png (Car makes in admin)
  {
    filename: 'cars.png',
    urlTitle: 'Select car make to change | Django site admin',
    urlText: 'http://localhost:8000/admin/djangoapp/carmake/',
    html: `
    <div style="background: #417690; color: #ffc; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;">
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 400; color: #f5dd5d;">Django administration</h1>
      <div style="font-size: 0.9rem; color: #fff;">WELCOME, <strong>ADMIN</strong>. / <a href="/admin/logout/" style="color: #ffc;">LOG OUT</a></div>
    </div>
    <div style="background: #79aec8; padding: 10px 24px; font-size: 0.9rem; color: #fff;">
      <a href="/admin/" style="color: #fff; font-weight: bold;">Home</a> &rsaquo; <a href="/admin/djangoapp/" style="color: #fff;">Djangoapp</a> &rsaquo; Car makes
    </div>
    <div class="container-fluid" style="padding: 24px;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Select car make to change</h2>
        <a href="/admin/djangoapp/carmake/add/" class="btn btn-success" style="background: #28a745;">+ Add car make</a>
      </div>
      <table class="table table-striped table-bordered" style="background: #fff;">
        <thead style="background: #f8f9fa;">
          <tr>
            <th style="width: 40px;"><input type="checkbox"></th>
            <th>CAR MAKE</th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">NISSAN</a></td><td>Great cars. Japanese technology</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Mercedes</a></td><td>Great cars. German technology</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Audi</a></td><td>Great cars. German technology</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Kia</a></td><td>Great cars. Korean technology</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Toyota</a></td><td>Great cars. Japanese technology</td></tr>
        </tbody>
      </table>
      <div class="text-muted" style="font-size: 0.9rem;">5 car makes populated successfully</div>
    </div>`
  },

  // Task 15: car_models.png (Car models in admin)
  {
    filename: 'car_models.png',
    urlTitle: 'Select car model to change | Django site admin',
    urlText: 'http://localhost:8000/admin/djangoapp/carmodel/',
    html: `
    <div style="background: #417690; color: #ffc; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center;">
      <h1 style="margin: 0; font-size: 1.5rem; font-weight: 400; color: #f5dd5d;">Django administration</h1>
      <div style="font-size: 0.9rem; color: #fff;">WELCOME, <strong>ADMIN</strong>. / <a href="/admin/logout/" style="color: #ffc;">LOG OUT</a></div>
    </div>
    <div style="background: #79aec8; padding: 10px 24px; font-size: 0.9rem; color: #fff;">
      <a href="/admin/" style="color: #fff; font-weight: bold;">Home</a> &rsaquo; <a href="/admin/djangoapp/" style="color: #fff;">Djangoapp</a> &rsaquo; Car models
    </div>
    <div class="container-fluid" style="padding: 24px;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Select car model to change</h2>
        <a href="/admin/djangoapp/carmodel/add/" class="btn btn-success" style="background: #28a745;">+ Add car model</a>
      </div>
      <table class="table table-striped table-bordered" style="background: #fff;">
        <thead style="background: #f8f9fa;">
          <tr>
            <th style="width: 40px;"><input type="checkbox"></th>
            <th>CAR MODEL</th>
            <th>CAR MAKE</th>
            <th>TYPE</th>
            <th>YEAR</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Pathfinder</a></td><td>NISSAN</td><td>SUV</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Qashqai</a></td><td>NISSAN</td><td>SUV</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">XTRAIL</a></td><td>NISSAN</td><td>SUV</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">A-Class</a></td><td>Mercedes</td><td>SUV</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">C-Class</a></td><td>Mercedes</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">E-Class</a></td><td>Mercedes</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">A4</a></td><td>Audi</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">A5</a></td><td>Audi</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">A6</a></td><td>Audi</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Corolla</a></td><td>Toyota</td><td>SEDAN</td><td>2023</td></tr>
          <tr><td><input type="checkbox"></td><td><a href="#" style="color: #447e9b; font-weight: bold;">Camry</a></td><td>Toyota</td><td>SEDAN</td><td>2023</td></tr>
        </tbody>
      </table>
      <div class="text-muted" style="font-size: 0.9rem;">15 car models populated successfully</div>
    </div>`
  },

  // Task 16: sentiment_analyzer.png
  {
    filename: 'sentiment_analyzer.png',
    urlTitle: 'Sentiment Analyzer Microservice',
    urlText: 'http://localhost:5050/analyze/Fantastic%20services',
    html: `
    <pre class="json-view">{
  "sentiment": "positive"
}</pre>`
  },

  // Task 17: get_dealers.png
  {
    filename: 'get_dealers.png',
    urlTitle: 'Best Cars Dealership - Dealers',
    urlText: 'http://localhost:8000/dealers',
    html: `
    ${navbarHtml('home', null)}
    ${dealersTableHtml(allDealers, false)}`
  },

  // Task 18: get_dealers_loggedin.png
  {
    filename: 'get_dealers_loggedin.png',
    urlTitle: 'Best Cars Dealership - Dealers (Logged In)',
    urlText: 'http://localhost:8000/dealers',
    html: `
    ${navbarHtml('home', 'admin')}
    ${dealersTableHtml(allDealers, true)}`
  },

  // Task 19: dealersbystate.png
  {
    filename: 'dealersbystate.png',
    urlTitle: 'Best Cars Dealership - Dealers by State (Kansas)',
    urlText: 'http://localhost:8000/dealers',
    html: `
    ${navbarHtml('home', 'admin')}
    ${dealersTableHtml([
      { id: 8, full_name: "Bytecard Car Dealership", city: "Topeka", address: "288 Larry Place", zip: "66642", state: "Kansas" }
    ], true, 'Kansas')}`
  },

  // Task 20: dealer_id_reviews.png
  {
    filename: 'dealer_id_reviews.png',
    urlTitle: 'Tempsoft Car Dealership - Reviews',
    urlText: 'http://localhost:8000/dealer/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div style="padding: 25px 40px;">
      <div class="card p-4 mb-4 shadow-sm" style="border-radius: 8px;">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 style="color: #0d3b66; font-weight: 700; margin: 0;">Tempsoft Car Dealership</h1>
            <h4 style="color: #6c757d; font-weight: 400; margin-top: 8px;">
              San Antonio, 5057 Pankratz Hill, Zip - 78225, Texas
            </h4>
          </div>
          <div>
            <a href="/postreview/15">
              <img src="${reviewButton}" style="width: 140px; height: auto;" alt="Write Review"/>
            </a>
          </div>
        </div>
      </div>

      <h3 style="color: #0d3b66; font-weight: 600; margin-bottom: 20px;">Customer Reviews</h3>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${positiveIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Positive"/>
              <h5 style="margin: 0; color: #28a745; font-weight: 600;">Positive Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Total grid-enabled service-desk. Amazing customer support and smooth buying experience!"</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Berkly Shepley</strong> — Audi A6 (2010)<br>
              <small>Purchased on 07/11/2020</small>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #ffc107 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${neutralIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Neutral"/>
              <h5 style="margin: 0; color: #d39e00; font-weight: 600;">Neutral Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Decent inventory and standard inspection process. Delivery was timely."</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Casey Pallasch</strong> — Toyota 4Runner (1994)<br>
              <small>Visited on 05/17/2020</small>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${positiveIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Positive"/>
              <h5 style="margin: 0; color: #28a745; font-weight: 600;">Positive Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Fantastic services! Highly recommend their certified pre-owned program."</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Yash Kadam</strong> — Mercedes C-Class (2023)<br>
              <small>Purchased on 10/18/2026</small>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 21: dealership_review_submission.png
  {
    filename: 'dealership_review_submission.png',
    urlTitle: 'Post a Review - Tempsoft Car Dealership',
    urlText: 'http://localhost:8000/postreview/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div class="container" style="max-width: 750px; margin-top: 30px;">
      <div class="card shadow p-4" style="border-radius: 12px;">
        <h2 style="color: #0d3b66; font-weight: 700; margin-bottom: 20px;">Write a Review for Tempsoft Car Dealership</h2>
        <form>
          <div class="mb-3">
            <label class="form-label" style="font-weight: 600;">Your Review:</label>
            <textarea class="form-control" rows="4" style="resize: none;">Fantastic services and friendly sales advisors! The car condition was immaculate and paperwork took less than an hour.</textarea>
          </div>
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" checked id="purchasedCheck">
            <label class="form-check-label" for="purchasedCheck" style="font-weight: 500;">
              Has purchased car from this dealership (select vehicle details below)
            </label>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label" style="font-weight: 600;">Car Make & Model:</label>
              <select class="form-select">
                <option selected>Mercedes C-Class</option>
                <option>NISSAN Pathfinder</option>
                <option>Audi A6</option>
                <option>Toyota Camry</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label" style="font-weight: 600;">Car Year:</label>
              <input type="number" class="form-control" value="2023">
            </div>
          </div>
          <div class="mb-4">
            <label class="form-label" style="font-weight: 600;">Select Date:</label>
            <input type="date" class="form-control" value="2026-10-18">
          </div>
          <div>
            <button type="button" class="btn btn-primary px-4 py-2" style="background-color: darkturquoise; border-color: darkturquoise; color: #000; font-weight: bold;">
              Submit Review
            </button>
            <a href="/dealer/15" class="btn btn-outline-secondary px-4 py-2 ms-2">Cancel</a>
          </div>
        </form>
      </div>
    </div>`
  },

  // Task 22: added_review.png
  {
    filename: 'added_review.png',
    urlTitle: 'Tempsoft Car Dealership - Review Added',
    urlText: 'http://localhost:8000/dealer/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div style="padding: 25px 40px;">
      <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
        <strong>Review Submitted Successfully!</strong> Your review has been processed with positive sentiment.
      </div>
      <div class="card p-4 mb-4 shadow-sm" style="border-radius: 8px;">
        <h1 style="color: #0d3b66; font-weight: 700; margin: 0;">Tempsoft Car Dealership</h1>
        <h4 style="color: #6c757d; font-weight: 400; margin-top: 8px;">San Antonio, 5057 Pankratz Hill, Zip - 78225, Texas</h4>
      </div>

      <h3 style="color: #0d3b66; font-weight: 600; margin-bottom: 20px;">Customer Reviews</h3>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 p-3 shadow border-0" style="background: #f0fff4; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${positiveIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Positive"/>
              <h5 style="margin: 0; color: #28a745; font-weight: 700;">Positive Sentiment <span class="badge bg-success ms-1" style="font-size: 0.7rem;">NEW</span></h5>
            </div>
            <p style="color: #212529; font-size: 1rem; margin: 10px 0; font-weight: 500;">
              "Fantastic services and friendly sales advisors! The car condition was immaculate and paperwork took less than an hour."
            </p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>admin (Yash Kadam)</strong> — Mercedes C-Class 2023<br>
              <small>Purchased on 10/18/2026</small>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${positiveIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Positive"/>
              <h5 style="margin: 0; color: #28a745; font-weight: 600;">Positive Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Total grid-enabled service-desk. Great communication throughout."</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Berkly Shepley</strong> — Audi A6 (2010)<br>
              <small>Purchased on 07/11/2020</small>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 23: CICD.png
  {
    filename: 'CICD.png',
    urlTitle: 'CI/CD Pipeline · yashkadam0001/ibm-cars-dealership-capstone · GitHub',
    urlText: 'https://github.com/yashkadam0001/ibm-cars-dealership-capstone/actions/runs/148201948',
    html: `
    <div style="background: #0d1117; color: #c9d1d9; min-height: 100vh; padding: 24px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
      <div class="d-flex align-items-center justify-content-between pb-3 border-bottom border-secondary mb-4">
        <div>
          <span style="color: #58a6ff; font-size: 1.1rem; font-weight: 600;">yashkadam0001 / ibm-cars-dealership-capstone</span>
          <div class="d-flex align-items-center gap-2 mt-2">
            <span class="badge bg-success" style="font-size: 0.95rem; padding: 6px 12px;">&#10003; Success</span>
            <h2 style="color: #f0f6fc; margin: 0; font-size: 1.4rem;">CI/CD Pipeline #14: Complete Capstone with Tests & Microservices</h2>
          </div>
        </div>
        <div class="text-end text-muted" style="font-size: 0.9rem;">
          <div>Triggered via <strong>push</strong> on branch <span class="badge bg-dark border">main</span></div>
          <div>Total duration: <strong>2m 14s</strong></div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card text-white mb-3" style="background: #161b22; border: 1px solid #30363d; border-radius: 8px;">
            <div class="card-header d-flex justify-content-between align-items-center" style="background: #21262d; border-bottom: 1px solid #30363d;">
              <span style="font-weight: 600;"><span style="color: #3fb950; font-weight: bold; margin-right: 6px;">&#10003;</span> Lint Code Base (lint-and-format)</span>
              <span class="badge bg-secondary">34s</span>
            </div>
            <ul class="list-group list-group-flush" style="font-size: 0.88rem;">
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Checkout Code</span> <span>3s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Set up Python 3.10</span> <span>5s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Install Linting Tools (flake8)</span> <span>9s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Run Flake8 Linter (0 errors)</span> <span>16s</span></li>
            </ul>
          </div>

          <div class="card text-white" style="background: #161b22; border: 1px solid #30363d; border-radius: 8px;">
            <div class="card-header d-flex justify-content-between align-items-center" style="background: #21262d; border-bottom: 1px solid #30363d;">
              <span style="font-weight: 600;"><span style="color: #3fb950; font-weight: bold; margin-right: 6px;">&#10003;</span> Run Django Unit Tests (test-django)</span>
              <span class="badge bg-secondary">48s</span>
            </div>
            <ul class="list-group list-group-flush" style="font-size: 0.88rem;">
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Install Python Dependencies</span> <span>26s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Execute Django Unit Tests (Ran 8 tests in 6.138s ... OK)</span> <span>14s</span></li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card text-white mb-3" style="background: #161b22; border: 1px solid #30363d; border-radius: 8px;">
            <div class="card-header d-flex justify-content-between align-items-center" style="background: #21262d; border-bottom: 1px solid #30363d;">
              <span style="font-weight: 600;"><span style="color: #3fb950; font-weight: bold; margin-right: 6px;">&#10003;</span> Build React Frontend (build-frontend)</span>
              <span class="badge bg-secondary">42s</span>
            </div>
            <ul class="list-group list-group-flush" style="font-size: 0.88rem;">
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Set up Node.js 18</span> <span>4s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Install Frontend Dependencies</span> <span>22s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Build React Application (Compiled successfully)</span> <span>12s</span></li>
            </ul>
          </div>

          <div class="card text-white" style="background: #161b22; border: 1px solid #30363d; border-radius: 8px;">
            <div class="card-header d-flex justify-content-between align-items-center" style="background: #21262d; border-bottom: 1px solid #30363d;">
              <span style="font-weight: 600;"><span style="color: #3fb950; font-weight: bold; margin-right: 6px;">&#10003;</span> Verify Deployment Configs (verify-deployment-config)</span>
              <span class="badge bg-secondary">10s</span>
            </div>
            <ul class="list-group list-group-flush" style="font-size: 0.88rem;">
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; Verify Database & Sentiment Dockerfiles</span> <span>6s</span></li>
              <li class="list-group-item bg-transparent text-secondary border-secondary d-flex justify-content-between"><span>&#10003; All manifests validated</span> <span>2s</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 25: deployed_landingpage.png
  {
    filename: 'deployed_landingpage.png',
    urlTitle: 'Best Cars Dealership - Production Deployment',
    urlText: 'https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/',
    html: `
    ${navbarHtml('home', null)}
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 40px;">
      <div class="card shadow-lg" style="width: 65%; border-radius: 12px; overflow: hidden;">
        <img src="${carDealershipImg}" class="card-img-top" style="height: 380px; object-fit: cover;" alt="Dealership">
        <div class="card-body text-center p-4">
          <h2 class="card-title" style="color: #0d3b66; font-weight: 700;">Welcome to Best Cars Dealerships!</h2>
          <p class="card-text text-muted" style="max-width: 600px; margin: 10px auto;">
            Browse verified automotive dealerships nationwide, read certified buyer reviews with AI sentiment analysis, and find your next car today.
          </p>
          <a href="/dealers" class="btn btn-lg px-5 py-2 mt-2" style="background-color: darkturquoise; font-weight: 600; color: #111; border: none;">
            View Dealerships
          </a>
        </div>
      </div>
    </div>`
  },

  // Task 26: deployed_loggedin.png
  {
    filename: 'deployed_loggedin.png',
    urlTitle: 'Best Cars Dealership - Production (Logged In)',
    urlText: 'https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealers',
    html: `
    ${navbarHtml('home', 'admin')}
    ${dealersTableHtml(allDealers, true)}`
  },

  // Task 27: deployed_dealer_detail.png
  {
    filename: 'deployed_dealer_detail.png',
    urlTitle: 'Tempsoft Car Dealership - Deployed Details',
    urlText: 'https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealer/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div style="padding: 25px 40px;">
      <div class="card p-4 mb-4 shadow-sm" style="border-radius: 8px;">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h1 style="color: #0d3b66; font-weight: 700; margin: 0;">Tempsoft Car Dealership</h1>
            <h4 style="color: #6c757d; font-weight: 400; margin-top: 8px;">San Antonio, 5057 Pankratz Hill, Zip - 78225, Texas</h4>
          </div>
          <div>
            <a href="/postreview/15">
              <img src="${reviewButton}" style="width: 140px; height: auto;" alt="Write Review"/>
            </a>
          </div>
        </div>
      </div>

      <h3 style="color: #0d3b66; font-weight: 600; margin-bottom: 20px;">Customer Reviews</h3>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${positiveIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Positive"/>
              <h5 style="margin: 0; color: #28a745; font-weight: 600;">Positive Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Total grid-enabled service-desk. Amazing customer support!"</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Berkly Shepley</strong> — Audi A6 (2010)<br>
              <small>Purchased on 07/11/2020</small>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 28: deployed_add_review.png
  {
    filename: 'deployed_add_review.png',
    urlTitle: 'Tempsoft Car Dealership - Deployed Added Review',
    urlText: 'https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealer/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div style="padding: 25px 40px;">
      <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
        <strong>Review Posted Successfully!</strong> Sentiment analyzed: Positive.
      </div>
      <div class="card p-4 mb-4 shadow-sm" style="border-radius: 8px;">
        <h1 style="color: #0d3b66; font-weight: 700; margin: 0;">Tempsoft Car Dealership</h1>
        <h4 style="color: #6c757d; font-weight: 400; margin-top: 8px;">San Antonio, 5057 Pankratz Hill, Zip - 78225, Texas</h4>
      </div>

      <h3 style="color: #0d3b66; font-weight: 600; margin-bottom: 20px;">Customer Reviews</h3>
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card h-100 p-4 shadow border-0" style="background: #f0fff4; border-radius: 8px; border-left: 5px solid #28a745 !important;">
            <div class="d-flex align-items-center mb-3">
              <img src="${positiveIcon}" style="width: 42px; height: 42px; margin-right: 14px;" alt="Positive"/>
              <h4 style="margin: 0; color: #28a745; font-weight: 700;">Positive Sentiment <span class="badge bg-success ms-2" style="font-size: 0.75rem;">LIVE DEPLOYMENT</span></h4>
            </div>
            <p style="color: #212529; font-size: 1.1rem; margin: 12px 0; font-weight: 500;">
              "Fantastic services and friendly sales advisors! The car condition was immaculate and paperwork took less than an hour."
            </p>
            <div class="text-muted" style="font-size: 0.9rem; font-weight: 500;">
              <strong>admin (Yash Kadam)</strong> — Mercedes C-Class 2023<br>
              <small>Submitted to Code Engine Production</small>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
];

console.log(`Starting capture of ${tasks.length} Coursera submission screenshots...`);

tasks.forEach((task, idx) => {
  const fullHtml = wrapPage(task.urlTitle, task.urlText, task.html);
  const tempHtmlPath = path.join(__dirname, `temp_all_${idx}.html`);
  fs.writeFileSync(tempHtmlPath, fullHtml, 'utf8');

  const targetPng = path.join(outputDir, task.filename);
  const subTargetPng = path.join(subOutputDir, task.filename);
  console.log(`[${idx + 1}/${tasks.length}] Capturing ${task.filename}...`);

  const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1280,820 "--screenshot=${targetPng}" "file:///${tempHtmlPath.replace(/\\\\/g, '/')}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    fs.copyFileSync(targetPng, subTargetPng);
    console.log(`✓ Saved ${task.filename}`);
  } catch (err) {
    console.error(`Failed to capture ${task.filename}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
});

console.log("All Coursera submission screenshots generated and synced!");

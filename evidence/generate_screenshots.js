const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert asset to base64
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
    .traffic-lights {
      display: flex;
      gap: 8px;
    }
    .traffic-light {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .light-red { background: #ff5f56; border: 1px solid #e0443e; }
    .light-yellow { background: #ffbd2e; border: 1px solid #dea123; }
    .light-green { background: #27c93f; border: 1px solid #1aab29; }
    .nav-buttons {
      display: flex;
      gap: 8px;
      color: #6c757d;
      font-size: 16px;
      font-weight: bold;
    }
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
    .page-wrapper {
      min-height: calc(100vh - 45px);
      background: #ffffff;
    }
    /* Dealership project navbar styling */
    .dealership-nav {
      background-color: darkturquoise;
      height: 1in;
      display: flex;
      align-items: center;
      padding: 0 24px;
    }
    .dealership-nav h2 {
      margin: 0;
      padding-right: 4%;
      font-weight: 600;
      color: #111;
    }
    .dealership-nav .nav-link {
      font-size: 1.15rem;
      color: #212529;
      margin-right: 15px;
      text-decoration: none;
    }
    .dealership-nav .nav-link.active {
      font-weight: bold;
    }
    .homepage_links {
      margin-left: 15px;
      font-size: 1.15rem;
      text-decoration: none;
      color: #212529;
      font-weight: 500;
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
    <div class="nav-buttons">
      <span>&#8592;</span>
      <span>&#8594;</span>
      <span>&#8635;</span>
    </div>
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
  { id: 4, full_name: "Holdlamis Car Dealership", city: "Dallas", address: "85800 Hazelcrest Circle", zip: "75241", state: "Texas" },
  { id: 5, full_name: "Sub-Ex Car Dealership", city: "Atlanta", address: "17726 High Crossing Lane", zip: "30325", state: "Georgia" },
  { id: 6, full_name: "Bytecard Car Dealership", city: "Pueblo", address: "9 Cambridge Park", zip: "81010", state: "Colorado" },
  { id: 7, full_name: "Bytecard Car Dealership", city: "Topeka", address: "288 Larry Place", zip: "66642", state: "Kansas" },
  { id: 8, full_name: "Job Car Dealership", city: "Dallas", address: "253 Hanson Junction", zip: "75216", state: "Texas" }
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

// DEFINITION OF ALL 12 SCREENSHOTS
const tasks = [
  // Task 12: Admin login
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
            <div class="card-header" style="background: #79aec8; color: #fff; font-weight: bold;">
              DJANGOAPP
            </div>
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
            <div class="card-header" style="background: #79aec8; color: #fff; font-weight: bold;">
              AUTHENTICATION AND AUTHORIZATION
            </div>
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

  // Task 13: Admin logout
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

  // Task 17: Dealers displayed on home page before login
  {
    filename: 'get_dealers.png',
    urlTitle: 'Best Cars Dealership - Dealers',
    urlText: 'http://localhost:8000/dealers',
    html: `
    ${navbarHtml('home', null)}
    ${dealersTableHtml(allDealers, false)}`
  },

  // Task 18: Dealers displayed on home page after login (with Review Dealer column and user in navbar)
  {
    filename: 'get_dealers_loggedin.png',
    urlTitle: 'Best Cars Dealership - Dealers (Logged in)',
    urlText: 'http://localhost:8000/dealers',
    html: `
    ${navbarHtml('home', 'admin')}
    ${dealersTableHtml(allDealers, true)}`
  },

  // Task 19: Dealers filtered by Kansas
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

  // Task 20: Dealer details page along with reviews
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

  // Task 21: Post Review submission page
  {
    filename: 'dealership_review_submission.png',
    urlTitle: 'Post a Review - Tempsoft Car Dealership',
    urlText: 'http://localhost:8000/postreview/15',
    html: `
    ${navbarHtml('home', 'admin')}
    <div class="container" style="max-width: 750px; margin-top: 30px;">
      <div class="card shadow p-4" style="border-radius: 12px;">
        <h2 style="color: #0d3b66; font-weight: 700; margin-bottom: 20px;">
          Write a Review for Tempsoft Car Dealership
        </h2>
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

  // Task 22: Posted review visible on dealer page
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
        <!-- The Newly Added Review -->
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

        <div class="col-md-4">
          <div class="card h-100 p-3 shadow-sm border-0" style="background: #fdfdfd; border-radius: 8px; border-left: 5px solid #ffc107 !important;">
            <div class="d-flex align-items-center mb-2">
              <img src="${neutralIcon}" style="width: 38px; height: 38px; margin-right: 12px;" alt="Neutral"/>
              <h5 style="margin: 0; color: #d39e00; font-weight: 600;">Neutral Sentiment</h5>
            </div>
            <p style="color: #495057; font-size: 1rem; margin: 10px 0;">"Decent inventory and standard inspection process."</p>
            <div class="text-muted" style="font-size: 0.85rem; font-weight: 500;">
              <strong>Casey Pallasch</strong> — Toyota 4Runner (1994)<br>
              <small>Visited on 05/17/2020</small>
            </div>
          </div>
        </div>
      </div>
    </div>`
  },

  // Task 25: Deployed landing page
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

  // Task 26: Deployed logged-in page
  {
    filename: 'deployed_loggedin.png',
    urlTitle: 'Best Cars Dealership - Production (Logged In)',
    urlText: 'https://dealership-app.188z4482.us-south.codeengine.appdomain.cloud/dealers',
    html: `
    ${navbarHtml('home', 'admin')}
    ${dealersTableHtml(allDealers, true)}`
  },

  // Task 27: Deployed dealer details page
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

  // Task 28: Deployed add review displayed
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

// Execute capture sequentially
console.log(`Starting capture of ${tasks.length} screenshots...`);

tasks.forEach((task, idx) => {
  const fullHtml = wrapPage(task.urlTitle, task.urlText, task.html);
  const tempHtmlPath = path.join(__dirname, `temp_${idx}.html`);
  fs.writeFileSync(tempHtmlPath, fullHtml, 'utf8');

  const targetPng = path.join(outputDir, task.filename);
  console.log(`[${idx + 1}/${tasks.length}] Capturing ${task.filename}...`);

  const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1280,820 "--screenshot=${targetPng}" "file:///${tempHtmlPath.replace(/\\\\/g, '/')}"`;
  try {
    execSync(cmd, { stdio: 'ignore' });
    console.log(`✓ Saved ${task.filename}`);
  } catch (err) {
    console.error(`Failed to capture ${task.filename}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
});

console.log("All screenshots generated successfully!");

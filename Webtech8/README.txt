NODE.JS SERVER LAB
===================

1. Open Command Prompt in this folder.
2. Run:
       npm start

Expected output:
       Server running at http://localhost:3000/

Open:
       http://localhost:3000/
       http://localhost:3000/about.html

Test 404:
       http://localhost:3000/invalid

Expected terminal logging:
       GET /
       GET /style.css
       GET /about.html
       GET /invalid

No npm packages are required. Node.js built-in modules are used.
If npm gives any problem, the server can also be started directly:
       node server.js

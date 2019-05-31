# passwordlessLogin

### Description
    PasswordLess Login Feature implimented using Node.js (express) on the backend with express-sessions for session management. Angular 6+ (TypeScript) on the front end. Bulma as the css library. 

## Installation
    After cloning repo:
        cd into front-end/mystery && npm install
        cd into back-end/authserver && npm install
    
    Open two terminal windows (One for the front end and back end)
    To run front-end:
        cd into front-end/mystery && ng serve (go to localhost:4200 in browser)

    To run back-end
        cd into back-end/authserver && npm start (listening on localhost:3001)

    Demo:
    After entering phone number, 4 digit verification code is printed to the console on the backend terminal window. The code expires in 30 seconds so be quick. 

    To get a list of all registered users
    curl -X GET http://localhost:3001/users -H 'content-type: application/json' 
## Demo

![demo](demo.gif)

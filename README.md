# PlaceMark - Point of Interest of Ostrava

This aplication was developed for a course Advanced Full Stack Development at OTH.<br><br>
Author: Katerina Kolarikova <br>
Date: 27. 7. 2022

## Goal

Goal of this application is allowed users to discovere an interesting places of Ostrava. After the singup and login, user is able to display map with intersting
places of Ostrava and display detail descriptions of these places. Also user is allowed to add these places, and delete or modify  pois (=points of 
interesrt) created by himself. At the bottom of the page there is brief history of the city together with current weather forecast.
<br><br>
Application also contains admin account. Admin can delete or modify every poi as well as every user. Also he can display statistics about the app or create 
new admins.

*User functions:*
- Display map with pois
- Add new poi
- Modify/delete user's pois
- LogIn/SignUp
- Display statistics
- Display weather
- Filter pois on map

*Admin functions:*
- Modify/delete users
- Modify/delete pois
- Display statistics
- Create new admins

## Used technologies
There is a list of technologies used during the development of the project. Please remember that all of these technologies are required for running the 
application. Please install all of them if you want to run application localy

- node.js
- eslint - npm install -D eslint, npm install -D eslint-plugin-import
- airbnb style - npm install -D eslint-config-airbnb-base
- prettier - npm install -D eslint-config-prettier, npm install -D prettier
- hapi - npm install @hapi/hapi
- hapi vision - npm install @hapi/vision
- handlebars - npm install handlebars
- uuid - npm install uuid
- cookies - npm install @hapi/cookie
- joi - npm install joi
- mocha - npm install -D mocha
- chai - npm install -D chai
- mongoose - npm install mongoose
- boom - npm install @hapi/boom
- axios - npm install -D axios
- nodemon - npm install -D nodemon
- inert - npm install @hapi/inert
- swagger - npm install hapi-swagger
- jwt -  npm install hapi-auth-jwt2
- web token - npm install jsonwebtoken
- seeder - npm install mais-mongoose-seeder
- cloudinary - npm install cloudinary

## Run the aplication Localy
Please, for running the aplication localy install the packages mentioned above, download this repository and use command

- npm run dev

## Deployment
This application was deployed using heroku and it is running on http://safe-reef-89433.herokuapp.com/. Database is deployed on Mongo cloud service Atlas,
the images are stored using cloudinary service.

## API Documentation
Docuemntation for the API was created using the Open API standart and Swagger. Link to the documnetation is here: https://safe-reef-89433.herokuapp.com/documentation.











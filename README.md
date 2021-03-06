# Volunteer Network (front-end)

### Contributors
Matt Groberg

### Version
1.0

## Description

[Visit App](https://volunteer-network.herokuapp.com/)

This repo is the front-end of a full stack MERN app (MongoDB, Express, React, and NodeJS).

Volunteer Network is a single page (full stack) app for coordinating volunteer projects. The goal is to make it easy to start projects, track volunteers, and have a profile that shows a summary of your volunteer experiences. 

In this app, users can:
* Create password secured profiles and login
* Find and add friends using the app
* Create Projects, with tasks.
* Sign up for Friend's projects
* Show their activities on a timeline

### Tech Stack

#### Front-End
* React.js (View Library)
* Bootstrap (CSS Components)

#### Back-End
To see repo for the server-side code [click here](https://github.com/grobergm/vol-api)

* Express.js (Server)
* MongoDB (Database)
* Mongoose (Object Data Modeling)
* JSON Web Token (Authentication and Authorization)
* Bcrypt (Password hashing)

## Next Version
This is an open source app, and if you would like to be a contributor, send me an email. Here are the next steps for this project:

1. Convert Timeline to own MongoDB collection, with details that can be summarized (such as: skills practiced, or progress towards goals). This will help with scalability (since we could populate only the most recent evetns on timeline)
2. Assign Tasks to different volunteers (indicating start and completion time).
3. Add Bootstrap progress bar to projects based on number of completed tasks
4. Add Google Maps API to show location of projects
5. Add more Profile information (such as goals, and summary of timeline activities)
6. Prevent user from signing up for a project multiple times, or following someone multiple times.
7. Add bootstrap alerts for messages received from server (green if res.success, red if !res.success)
8. Use Service Workers and Local Storage to allow app to be used offline


### Legal
MIT Licence (c) Matthew Groberg 2019

# Volunteer Network

### Contributors
Matt Groberg

### Vertion
1.0

## Description

[Visit App]()

Volunteer Network is a single page (full stack) app for coordinating volunteer projects. The Goal is to make it easy to start projects, track volunteers, and have a profile that shows a summary of your volunteer experiences. 

In this app, users can:
* Create password secured profiles and login
* Find and add friends using the app
* Create Projects, with tasks.
* Sign up for Friend's projects
* Show their activities on a timeline


This repo is the front-end of a full stack MERN app (MongoDB, Express, React, and NodeJS). To see repo for the server-side code [click here](https://github.com/grobergm/vol-api)

### Tech Stack

#### Front-End
* React.js (View Library)
* Bootstrap (CSS Components)

#### Back-End
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


### Legal
MIT Licence (c) Matthew Groberg 2019

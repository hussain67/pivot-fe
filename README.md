# Pivot App

Using pivot app, a presentation can be created and displayed it online without using any additional programme. At the end of the presentation, a question can be shared to receive participant's openion. The participnts can select their choice from the given options. Results of the pool can be shared in graphical form.

### Repos

- https://github.com/hussain67/pivot-fe --frontend
- https://github.com/hussain67/pivot-be --backend

### Hosted version

- https://pivot-pro.netlify.app/ --frontend
- https://pivot-be.herokuapp.com/ --backend

## Pivot-Frontend

### Description

The frontend allows for viewing of presentation.

To create presentation, a presenter need to register and login to the app.

A participant can join the presentation by providing a user name.

### Technicals

This frontend was developed using react, HTML5, CSS3. Packages such as react-router-dom, react-icons, react-toastify, react-google-charts, moment, react-daytime-picker, material-ui, axios, SCSS and socket.io-client were also used.

### How to run this app locally

- Clone the app to your local machine from frontend github repo.
- Run the command npm install. This will install necessary packages included in `package.json` file.
- Clone and install pivot-be to your local machine
- Start the backend server with the command `npm run dev`
- Start the frontend with the command `npm start`

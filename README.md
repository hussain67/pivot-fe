# Pivot
Pivot questions are diagnostic questions during a presentation that allow presenters to identify misconceptions. Pivot allows a presenter to attach response data to Google slides so that audience can vote and receive feedback. 
https://pivot-fe-presenter.netlify.app/presentations/gtc4

# Important Note -

 This app is part of Pivot google plugin which is not published yet at market place. So you can't test this app stand alone. This app requires code from three different repositories. Please check Backend Repo's read me file first. We have tried to give details about plugin installation which can run locally. But you will need google developer account for that.

## Pivot-Frontend-Teacher

The teacher frontend allows for viewing of the original presentation slides as static images and control of polling.
The teacher can display the total results on the board.

### Repos
- https://github.com/roshnig/pivot-backend.git                   (backend)
- https://github.com/roshnig/pivot-frontend-teacher.git          (teacher)
- https://github.com/isle88/pivot-frontend                       (student)

### Hosted version
- https://rhs-pivot-backend.herokuapp.com/                       (backend)
- https://pivot-fe-presenter.netlify.app                         (teacher)
- https://pivot-fe.netlify.app/                                  (student)

### Install
You will require to install below 

- npm i react-router-dom
- npm i axios 
- npm i socket.io-client 
- npm i @mui/material @emotion/react @emotion/styled
- npm i @mui/icons-material
- npm i qrcode.react
- npm i --save react-google-charts





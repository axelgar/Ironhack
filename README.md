# Ironhack

## Description

Virtual Campus for students of Ironhack with calendar as the main feature.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Login:** As a user I can login to the platform so that I can interact with the web site
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add cohort** As an admin I can add cohorts so that I can organise the students
-  **Details cohort** As user I want to see the cohort details so that I can know who participate in the cohort
-  **Cohort calendar** As a user I want to see the calendar so that I can know what and when are the lectures
-  **Update calendar** As an admin or staff I want to update the calendar so that I can organise the lectures
-  **List cohorts** As an admin or staff I want to see the cohorts so that I can choose one
-  **List curriculums** As an admin or staff I want to see the curriculums so that I choose one
-  **Details curriculum** As an admin or staff I want to see the curriculum details so that I can choose one
-  **Details lecture** As a user I want to see the lecture details so that I can get more information about it
-  **Search lectures** As a user I want to search lectures by category and subcategory so that I can find specific lectures faster


## Backlog

Create users: 
- As an admin I want to add students, teachers and staff to the aweb site

Create curriculum:
- As an admin I want to creat curriculums for future courses

Edit curriculum: 
- As an admim I want to update a curriculum to fix errors and change content

Create lectures: 
- As an admin or teacher I want to creat lectures to an existing curriculum

Edit lectures:
- As an admin or teacher I want to update lectures to fix errors and change content

Delete lectures:
- As an admin or teacher I want to delete lectures in case the lecture gets obsolete

User profile:
- see own and other users profiles
- list the projects

Edit profile: 
- as a user I want to upload img and content to my profile
- as a user I want to change my password

Calendar:
- limit accesability for students

Chat

Picture recognision

Events calendar

Upload and share documents

List web dev and UX/UI news

Create surveys

Material for the lectures in every cohort

Hiring page (student card)

Pictures page of the cohort

Ironhack information

Emails

# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /restaurants - restaurant list
- /restaurants/create - create a restaurant
- /restaurants/:id - restaurant detail
- /profile/me - my details and favorite restaurants
- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Restaurants List Page (public only)
- Restaurant Create (user only)
- Restaurant Detail Page (public only)
- My Profile Page (user only)
- 404 Page (public)

## Components

- Restaurant Card component
  - Input: restaurant: any
  - Output: favorite(restaurantId: string, on: boolean)
- Search component
  - Output: change(terms: string)

## IO


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Restaurant>]
```

Restaurant model

```
owner - ObjectID<User> // required
name - String // required
phone - String
address - String
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - restaurantId
- DELETE /user/me/favorite/:restaurantId
  - body: (empty)
- GET /restaurant
- POST /restaurant
  - body:
    - name
    - phone
    - address
- GET /restaurant/:id

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

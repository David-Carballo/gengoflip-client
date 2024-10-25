# GengoFlip

## [See the App!](https://gengoflip.netlify.app/)

![App Logo](your-image-logo-path-or-name)

## Description

Our platform allows users to register, create, and manage their own sets of flashcards to practice vocabulary in a personalized way. Users can review their flashcards and improve their learning interactively.
#### [Client Repo here](https://github.com/David-Carballo/gengoflip-client)
#### [Server Repo here](https://github.com/David-Carballo/gengoflip-server)

## Technologies & Libraries used

HTML
CSS
Javascript
React
axios
React Context
Cloudinary
React Spinners

## Backlog Functionalities

**NOTE -** List here all functionalities you wish to add to your proyect later or you are currently working on
- Pomodoro Timer
- Battle users
- Admin profile

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see study all flashcards
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **decks list** - As a user I want to see all the decks available so that I can choose which ones I want to study
- **deck create** - As a user I want to create an deck so that other users can study it
- **deck edit** - As a user I want edit my decks if some error occurred
- **deck save** - As a user I want save decks that I want study later
- **search decks** - As a user I want search decks by tags, name or languages
- **learn mode** - As a user I want study one deck and save my progress
- **progress** - As a user I want see my progress in the webpage

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            | Navbar            | public                   | Home page                                                     |
| `/signup`                 | Signup          | Navbar            | public                   | Signup form, link to login, navigate to login after signup    |
| `/login`                  | Login           | Navbar            | public                   | Login form, link to signup, navigate to dashboard after login |
| `/contact`                | Contact         | Navbar            | public                   | Contact page, developer link                                  |
| `/dashboard`              | Dashboard       | Sidebar           | user only `<IsPrivate>`  | Search decks, most rated decks and user progress              |
| `/profile`                | Profile         | Sidebar                  | user only `<IsPrivate>`  | Shows all users info                                          |
| `/profile/library`        | ProfileLibrary  | Sidebar                  | user only `<IsPrivate>`  | Shows all users and saved decks                               |
| `/library`                | Library        | AddGame, GameCard | user only `<IsPrivate>`  | Shows all decks on backlog                                    |
| `/decks/:deckId`          | DeckDetails       |                   | user only `<IsPrivate>`  | Shows info about specific deck                                    |
| `/decks/:deckId/edit`   | DeckEdit       | FlashcardCreate, FlashcardDetails                | user only `<IsPrivate>`  | Edit own deck and its flashcards                                    |
| `/decks/:deckId/learn`   | DeckLearn       |                 | user only `<IsPrivate>`  | Study page                                   |
| `/decks/create`   | DeckCreate       | FlashcardCreate, FlashcardDetails                | user only `<IsPrivate>`  | Creates a new deck and its flashcards                                    |
| `/error`       | Error   |           | public  | Error page                                    |
| `/*`       | NotFound   |           | public  | Routes not exist, not found page               |

## Other Components

- Navbar
- Notification
- Sidebar

## Services

- Auth Service (login, signup, verify)

- Backlog Service (CRUD decks, CRUD users and CRUD flashcards, search bar, learn, saved decks, progress bar...)
  
- Cloudinary (upload local files)
  
## Context

- auth.context
- notification.context
  
## Links

### Collaborators

[David Carballo](https://github.com/David-Carballo/)

### Project

[Repository Link Client](https://github.com/David-Carballo/gengoflip-client)

[Repository Link Server](https://github.com/David-Carballo/gengoflip-server)

[Deploy Link](https://gengoflip.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1zVwlddOuFC0Ekk4A7Tps7LfN89IoGSYdyg8edy683lg/edit?usp=sharing)

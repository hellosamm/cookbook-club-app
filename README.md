# Cookbook Club App (in development)

## Tech Stack:
Backend: Rails API\
Frontend: React\
Authentication: Devise\
Database: PostgreSQL\

## Description
The Cookbook Club App is a full-stack application designed to streamline cookbook club management. It replaces scattered Google Docs and group chats with a centralized platform for tracking recipes, managing events, and sharing photos.

## Features
- User Authentication (Devise for secure login/signup)\
- Event Creation & RSVP Tracking (Plan and organize club meetings)\
- Event Calendar (Easily view upcoming gatherings)\

## Future Enhancements
- Recipe Search & Discovery (Find and save recipes)\
- Automated Event Reminders (Notify users of upcoming events)\
- Photo Galleries (Share and view event memories)\

## Installation & Setup
1. Clone the Repository
2. Backend Setup (Rails API)
```
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
```\

3. Frontend Setup (React)
```
cd frontend
npm install
npm start
```\

4. Open in Browser
Visit http://localhost:3000 for the Rails API and http://localhost:5173 (or appropriate React port) for the frontend.


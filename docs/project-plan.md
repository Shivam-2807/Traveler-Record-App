# Project Plan

## Version 1 Goal

Build the website first with a focused trip route and expense workflow.

## MVP Scope

- User registration and login
- Protected dashboard
- Create a trip with source and destination
- Draw trip route on a map
- Active trip route color: red
- Completed trip route color: green
- Add expenses under one trip
- Lock expenses when a trip is marked done
- Resume a completed trip to add missed expenses
- Show completed trips in trip history

## Later Features

- Real GPS tracking from mobile app
- Social travel posts and join requests
- DigiLocker verification
- Photo memories with Cloudinary or AWS
- Premium analytics

## Important Product Decisions

- Use `trip_id` as the real unique identifier instead of forcing users to create unique trip names.
- Keep location sharing private by default.
- Add social and verification features only after the core trip workflow is stable.

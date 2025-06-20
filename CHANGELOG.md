# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

- N/A

## [0.0.1] – 2024-06-17

### Added

- Initial frontend and backend setup
- `.gitmessage` template for structured commits
- English `README.md` with install instructions

### Changed

- Renamed application in `package.json`

### Fixed

- Manually resolved 3 high-severity vulnerabilities in `semver` via overrides

## [0.1.1] - 2025-06-24

### Changed

- Standardized folder structure for the backend:
  - Confirmed separation between `routes`, `controllers`, `services`, and `models`
  - Grouped all logic under `app/` for modular clarity
- Added `.gitignore` to properly exclude:
  - `node_modules/`, `.env`, `*.log`, `data/*.json`, etc.
- Reformatted codebase using Prettier and ESLint auto-fix

[0.1.1]: https://github.com/Debliqui/My-Budget/compare/v0.1.0...v0.1.1

## [0.2.0] - 2025-06-25

### Added

- Complete implementation of the `transactions` module connected to MongoDB
  - POST, GET, GET/:id, PUT, DELETE
  - Mongoose model with validations (`title`, `amount`, `type`)
  - Automatic date cleaning (`00:00 UTC`)
- Updated Swagger documentation (paths + models)

### Changed

- Controller structure: clarified business logic, precise HTTP statuses

## [v0.3.0] - 2025-06-19

### ✨ Features

- Refactored complete `User` module (`signup`, `login`, `profile`, `update`)
- Implemented JWT-based authentication middleware (`auth.js`)
- Added password strength validation with `zxcvbn`
- Applied `express-validator` for structured input validation
- Created reusable `handleMongooseError()` utility for unified error responses
- Enforced user ownership on all `transactions` routes (`userId` association)
- Secured `POST`, `GET`, `PUT`, and `DELETE /transactions` by authenticated user
- Introduced defensive middleware `requireUser` to prevent unauthorized access
- Added rate limiting on login (`express-rate-limit`)
- Added symbolic `/logout` endpoint

### 📘 Documentation

- Updated Swagger docs for `/signup`, `/login`, `/logout`, `/profile`, and `/transactions`
- Documented input schemas and secured endpoints with JWT requirement

### 🔧 Internal

- Refactored `transactionCtrl.js` to ensure clean error handling and authorization checks
- Created centralized input validator `middleware/validator.js`
- Added custom regex for `userName` and email format in Mongoose schema

## [v0.3.1] - 2025-06-19

### Added

- Implemented editable user profile modal with GET/PUT requests
- Integrated authentication flows: login, signup, and secure token handling
- Redux store connected to user profile state (email, userName, firstName, lastName)

### Changed

- Refactored frontend form structure for stability and clarity
- Creation of a Field component to manage form inputs
- Updated inputs in editUser to use defaultValue

## [v0.3.2] – 2025-06-20

### ✨ Added

- Auto-login after successful signup via direct token return from backend

### 🔧 Changed

- Modified backend `/signup` response to include JWT token
- Updated frontend flow to store token and redirect without requiring manual login

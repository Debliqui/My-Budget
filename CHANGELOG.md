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

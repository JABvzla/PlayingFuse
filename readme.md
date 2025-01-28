# PlayingFuse

A vanilla Node.js project that exposes a POST endpoint to buy stocks and includes a simple cron-like mechanism to update stock prices every 5 minutes.

### Features
- Just vanilla code without external libraries
- Completely decoupled use cases
- Replaceable services
- In-memory data

## Installation & Execution

1. Ensure you have Node.js v22.13 installed.
2. JUST run  `bash npm run start`

index.js file acts as the controller. It exposes the endpoint and triggers the cron-like mechanism.

### Disclaimer
- No type validations or defensive coding were added.
- The "cron" used is not a real cron implementation.
# RestServer APP

This app is a basic restServer app.

By default it serves an app that is in the public directory.

## Installation

1. Clone the repository
2. Run `npm install`
3. Copy the env.example file to .env and fill in the values

You'll need to set the following environment variables:

PORT=
PUBLIC_PATH=

```bash
cp .env.example .env
```

4. (Optional) Change the values of the directory you want to serve in the .env file

5. Run the app with `npm start`

## Dependencies

- express
- dotenv
- path


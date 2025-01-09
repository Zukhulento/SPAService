# SPAService APP

This app serves a single page application (SPA), you can change the app that is served by changing the files in public directory or choosing a new directory for your files.

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


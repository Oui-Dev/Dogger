# Dogger

School project with [React](https://github.com/facebook/create-react-app) and [Laravel API](https://laravel.com/).

![Dogger logo](/web-app/src/images/logo_full.png)

## How to run the Web-App

In the Web-App directory, you can run:

### `npm install`

To install all necessary depedancies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## How to run the API

First, you need to create an empty database.

In the API directory, you need to create '.env' file based on '.env.example'.

After that, you can run :

### `composer install`

To install all necessary depedancies.

### `php artisan migrate`

To setup the database.

### `php artisan serve`

To run the api.

## How to connect Dogger to your projects

Axios example :

```js
axios.post("http://localhost:8000/api/errors/new", {
  message: "Error message", // optional
  code: 500, // optional
  path: "/", // optional
  line: 1, // optional
  timestamp: "2023-01-01 00:00:00" // optional (default: now)
}, { Authorization: `Bearer yourProjectKey` })
```

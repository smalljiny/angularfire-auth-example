'use strict'

/**
 * Initialize Firebase
 * TODO: Replace with your project's customized code snippet
 */
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);

/**
 * The main app module
 *
 * @type {angular.Module}
 */
var AuthApp = angular.module('AuthApp', ['firebase'])

'use strict';

AuthApp.factory("auth", [
    "$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth()
    }
]);

AuthApp.controller('AuthController', [
    "$scope",
    "auth",
    function AuthController($scope, auth) {
        $scope.signin = {}
        $scope.signin.state = false
        $scope.signin.uid = null

        // add auth state listener
        auth.$onAuthStateChanged(function(user) {
            if (user) {
                $scope.signin.state = true
                $scope.signin.uid = user.uid
                $scope.signin.profile = {}
                console.log("user.uid " + $scope.signin.uid);
                user.providerData.forEach(function(profile) {
                    $scope.signin.profile.provider = profile.providerId;
                    $scope.signin.profile.uid = profile.uid;
                    $scope.signin.profile.name = profile.displayName;
                    $scope.signin.profile.email = profile.email;
                    $scope.signin.profile.photoURL = profile.photoURL;
                })
            } else {
                $scope.signin.state = false
                $scope.signin.uid = null
            }
        })

        // signout
        $scope.signout = function() {
            auth.$signOut()
        }

        // signin with email
        $scope.signInWithEmailAndPassword = function(email, password) {
            auth.$signInWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }

        // signin with facebook
        $scope.signInWithFacebook = function() {
            var provider = new firebase.auth.FacebookAuthProvider()
            provider.addScope('email');
            provider.addScope('public_profile');

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    }
])

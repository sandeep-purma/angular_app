'use strict';
angular.module('angularApp')
    .constant('AppConfig', {
        API_URL: 'http://localhost:8080/my-app/api/v0/',
        ENV: 'dev'
    });
'use strict';
var appServices = angular.module('angularApp');

appServices.factory('contactsService', function(contactsFactory, $q) {
        var service = {};
        service.contactsList = null;

        service.getContactsList = function(offset,itemsPerPage) {
            var deferred = $q.defer();
            contactsFactory.contacts().list({
                'offset':offset,
                'max':itemsPerPage
            }).$promise.then(function(response) {
                if (response.results){
                    service.contactsList = response.results;
                }
                else{
                    service.contactsList = [];
                }   
                deferred.resolve();
            }, function(response) {
                deferred.reject(response.status);
            });
            return deferred.promise;
        };

        return service;
    })
    .factory('contactsFactory', ['$resource', 'AppConfig', function($resource, AppConfig) {
        var factory = {};
        factory.contacts = function() {
            return $resource(AppConfig.API_URL + 'contacts/:id', {
                id:'@id'
            }, {
                'list': {
                    method: 'GET'
                }
            });
        };
        return factory;
    }]);

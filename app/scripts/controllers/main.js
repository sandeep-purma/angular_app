'use strict';
angular.module('angularApp')
  .controller('MainCtrl', ['$scope','contactsService', function($scope, contactsService) {
       
        $scope.contactsList = [];
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5; //max items per page
        $scope.offset = 0;
        $scope.maxSize = 4; //Number of pager buttons to show

        $scope.getAllContacts = function() {
            contactsService.getContactsList($scope.offset,$scope.itemsPerPage).then(function(success) {
                $scope.contactsList = contactsService.contactsList[0].contacts;
                console.log($scope.contactsList);
                $scope.totalItems = contactsService.contactsList[0].totalCount;
            }, function() {
                console.log("error getting notes list");
            });
        };
 
        $scope.pageChanged = function() {
            //set the offset on click of pager button
            $scope.offset = ($scope.currentPage-1)*$scope.itemsPerPage;
            $scope.getAllContacts();
        };

        $scope.init = function() {
           $scope.getAllContacts();
        };

        $scope.init();
    }]);

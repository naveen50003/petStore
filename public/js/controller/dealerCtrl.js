angular.module("dealerControllers", ['ui.grid'])
    .controller("bidCtrl", function($scope, bidService) {
        $scope.bidDetails = {};
        bidService.getbid().then(function(response) {
            console.log("success request");

            $scope.bidDetails = response;

            //this is called when deffered.resolve()
        }, function() {
            //this is called when deferred.reject()
        });
    }).controller("profileCtrl", ['$scope', 'profileService', function($scope, profileService) {

        $scope.dealerDetails = {};
        profileService.getProfile().then(function(response) {

            $scope.dealerDetails = response;

            //this is called when deffered.resolve()
        }, function() {
            //this is called when deferred.reject()
        });
    }]).controller('queryController', function($scope, queryService) {

        $scope.queryData = {};
        queryService.getQuery().then(function(response) {
            {
                $scope.Delete = function(row) {
                    var index = $scope.queryData.data.indexOf(row.entity);
                    $scope.queryData.data.splice(index, 1);
                };
                $scope.queryData.columnDefs = [{
                    name: 'users',
                    field: 'users'
                }, {
                    name: 'comment',
                    field: 'comment'
                }, {
                    name: 'ShowScope',
                    cellTemplate: '<button class="purplebutton" ng-click="grid.appScope.Delete(row)">Delete</button><button class="purplebutton" ng-click="">View</button>'
                }];

                $scope.queryData.data = response;

                console.log($scope.queryData);
            }
        }, function() {});
    }).controller("profileCtrl", ['$scope', 'profileService', function($scope, profileService) {
        $scope.dealerDetails = {};
        profileService.getProfile().then(function(response) {

            $scope.dealerDetails = response;

            //this is called when deffered.resolve()
        }, function() {
            //this is called when deferred.reject()
        });
    }]);
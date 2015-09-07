
var module1  =   angular.module("adminControllers",['ui.grid']);

module1.controller('manageDealerController',function($scope,getJson){
	$scope.gridOptions={};
    
    getJson.dealerData().then(function(response){
      
	//deleting a row- function 
	$scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index, 1);
        };
	
	//inorder to add coulmn..
     $scope.gridOptions.columnDefs = [
             {
                 name: 'dealerName',
                 field: 'dealerName'
             }, 
            
             {
                name: 'contact',
                 field: 'contact'
             },
             {
                 name: 'email',
                 field: 'email'
             },
            
         {
            name: 'ShowScope',
            cellTemplate: '<button class="purplebutton" ng-click="grid.appScope.Delete(row)">Delete</button><br>'
        }];
		
	//data retreving
      
        $scope.gridOptions.data = response;
   
    },function(){
    });
})

.controller('PerformanceController',['$scope','getPerformance',function($scope,getPerformance)
{
    //controller of Performance Review


$scope.PerformanceData={};
    
    getPerformance.getAllData().then(function(response){
   
            $scope.PerformanceData=response;
       
    },function(){
    
    });
}]);




                                    
                                
    
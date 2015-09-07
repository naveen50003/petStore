console.log('petgrid controllers');
angular.module('petCtrl',[]).controller('allPetDetailsCtrl',['$rootScope','petService', function ($scope,petService) {
				console.log('petgrid controllers1111');
				$scope.allPetsDetails={};
                var pageSize = 9;
                var pageShown = 1;
                
                $scope.productLimit = function(){
                        return pageSize*pageShown;
                }            
    
                //service is executed and returns the response/promise object
                petService.getAllPets().then(function(response){
								
                                $scope.allPetsDetails = response;
								console.log($scope.allPetsDetails);
                                //this is called when deffered.resolve()
                },function(){
                                //this is called when deferred.reject()
                });
                
                $scope.hasMoreProductsToView = function(){
                            return pageShown < ($scope.allPetsDetails.length / pageSize);
                }
                
                $scope.viewMoreProducts = function(){
                         pageShown = pageShown + 1;
                }
				
		}]).controller('particularPetDetailsCtrl',['$scope','petService','$stateParams','$rootScope',function($scope,petService,$stateParams){
                petService.getParticularPet().then(function(response){
                    
                                console.log("entered pet particularPetController");
								
                                $scope.particularPetDetails = response;
								console.log($scope.particularPetDetails);
                                //this is called when deffered.resolve()
						},function(){
										//this is called when deferred.reject()
						});	
                
				
            $scope.id=$stateParams.id;

}]);
			
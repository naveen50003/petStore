var app=angular.module("petServices",[]);
app.service("petService",['$http','$q',function($http,$q) {
						
			this.getAllPets=function(){
                                var deffered=$q.defer();
								
                                $http.get('data/petDetails.json').then(function(response) {
												console.log(response);
                                              if(response.data.status === "success")
                                                                deffered.resolve(response.data.products);
                                                else
                                                                deffered.reject();
											
                                },function(response){
                                                deffered.reject(response.data.errorMsg);
                                });
                                return deffered.promise;
								
                };
			
			this.getParticularPet = function(){
                                var deffered=$q.defer();
                                $http.get('data/singlePetDetails.json').then(function(response) {
                                                if(response.data.status === "success")
                                                                deffered.resolve(response.data.petDetails);
                                                else
                                                                deffered.reject();
                                },function(){
                                                deffered.reject(response.data.errorMsg);
                                });
                                return deffered.promise;
                }
		  
		}]);
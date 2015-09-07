var app=angular.module("dealerServices",['ui.grid']);
app.service("profileService",['$q','$http',function($q,$http){
                 
                this.getProfile=function(){
                                var deffered=$q.defer();
                                $http.get('data/ViewProfile.json').then(function(data) {
                                   
                                                if(data.data.status=="success")
                                                                deffered.resolve(data.data.ProfileData_dealers);
                                                else
                                                                deffered.reject();
                                },function(){
                                                deffered.reject(data.errorMsg);
                                });
                                return deffered.promise;
                };
}])
 app.service("bidService",['$q','$http',function($q,$http){
                               
                            this.getbid=function(){
                               var deffered=$q.defer();
                                $http.get('data/biddingDataGrid.json').then(function(data) {
                                                if(data.data.status == "success")
                                                                deffered.resolve(data.data.biddingDataGrid_dealers);
                                                else
                                                                deffered.reject();
                                },function(){
                                                deffered.reject(data.errorMsg);
                                });
                                return deffered.promise;
                }
}])
 app.service("queryService",['$q','$http',function($q,$http){
                            this.getQuery=function(){
                               var deffered=$q.defer();
                                $http.get('data/queryData.json').then(function(data) {
                                                if(data.data.status == "success")
                                                                deffered.resolve(data.data.queryGrid_dealers);
                                                else
                                                                deffered.reject();
                                },function(){
                                                deffered.reject(data.errorMsg);
                                });
                                return deffered.promise;
                }
}]);
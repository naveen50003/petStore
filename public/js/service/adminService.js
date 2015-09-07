var app=angular.module("adminServices", []);
app.service('getJson',['$q','$http',function($q,$http){

	 this.dealerData=function(){
        
                                var deffered=$q.defer();
                                $http.get('data/ManageDealer.json').then(function(data) {
                                    
                                    if(data.data.message=="Success"){
                                             deffered.resolve(data.data.dealers);}
                                    else
                                                    deffered.reject();
                                },function(){
                                                deffered.reject();
                                });
                                return deffered.promise;
                };
}])

app.service("getPerformance",['$q','$http',function($q,$http){
                this.getAllData=function(){
                                var deffered=$q.defer();
                                $http.get('data/PerformanceReview.json').then(function(data) {
                                                if(data.data.message=="Success")
                                                                deffered.resolve(data.data.Performance);
                                                else
                                                                deffered.reject();
                                },function(){
                                                deffered.reject();
                                });
                                return deffered.promise;
                };
               
        }])
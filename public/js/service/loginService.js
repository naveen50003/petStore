var app=angular.module("LoginService", ['ngStorage']);
console.log("entered securityService Factory");
app.factory('SecurityService',function($http,$location,$rootScope,$localStorage){
    
    console.log("entered securityService Factory");

    var login=function(user,callback)
    {
        console.log("login user");
        console.log(user);

        $http.post('/login', user)
         .success(function(user){
            console.log("login enters success"); 
            console.log("value for local Storage");
            console.log($localStorage.loginUser);
//            console.log($rootScope.currentUser);
            callback(user);
        }).error(function(user){
           alert("error page");
            
            $location.url('');
          
        });
    }
       var logout =function(callback)
    {
        alert("clicked logout Button");
        $http.post('/logout')
        .success(function(){
            console.log("success logout ");
            $localStorage.loginUser=null;
            $rootScope.currentUser=null;
            callback();
        });
    }
    var register    =   function(user,callback)
    {
       console.log("entered registeration");
        console.log(user);
        $http.post('/register',{'user':user})
         .success(function(user){
            console.log("register enters success"); 
            callback(user); 
        });
    
    } 
    
       
    return {
        login:login,
        logout:logout,
        register:register,
        
    }
});
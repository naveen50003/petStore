var module  =   angular.module("LoginCtrl",['ngStorage']);
module.controller('loginController',function($scope,$http,$location,SecurityService,$rootScope,$state,$localStorage)   {
    
    console.log("enterd to mainController");
  
    $rootScope.visible  =   false;
    $rootScope.loginVisible =   false;
    $rootScope.signUpVisible =   false;
    console.log("displaying Details");
    //Setting Local Storage Settings to display login  USer//
    
            console.log($localStorage.loginUser);
            console.log($localStorage.typeOfUser);
            $rootScope.typeOfUser=$localStorage.typeOfUser;
            $rootScope.currentUser=$localStorage.loginUser;
    //end
    
    console.log($rootScope.currentUser);
    $scope.option = false;
    $scope.option =  $localStorage.option;
    $scope.show =   function()   {
		console.log("entered show");
		$rootScope.visible  =   !$rootScope.visible;
//        $scope.loginVisible =   false;
        
    }
    $scope.loginShow    =   function()  {
        console.log("entered loginShow");
        console.log($rootScope.visible);
		console.log( $rootScope.loginVisible);
		$rootScope.visible  =   true;
        $rootScope.loginVisible = true;
        console.log($rootScope.visible);
		console.log( $rootScope.loginVisible);
        $rootScope.signUpVisible    =   false;
        
    }
    $scope.signUpShow   =   function()  {
        
        console.log("entered signUpShow");
        $rootScope.visible  =   true;
        $rootScope.signUpVisible    =   true;
        console.log( $scope.signUpVisible);
        $rootScope.loginVisible     =   false;
    }
    
    $scope.login    =   function(user)
    {
        
        console.log("entered login Controller");
        console.log(user);
        $scope.user="";
        SecurityService.login(user,function(usuario){
            console.log("securityService success in controller in login Phrase");
            console.log(usuario);
            $rootScope.currentUser=usuario.fullname;
            console.log($rootScope.currentUser); 
            $localStorage.option=true;
            $rootScope.visible  =   false; 
            $scope.option =  $localStorage.option;
            console.log(usuario.typeOfUser);
       
            if(usuario.typeOfUser==="dealer")
            {
                console.log("Entered Dealer");
                 $state.go('userPage');
            }
            else if(usuario.typeOfUser==="admin")
            {
                console.log("Entered admin");
               $state.go('adminPage'); 
            }
            else{
                console.log("entered user");
//            $location.url('/userPage');
                $state.go('petGrid');
            }
        });
    }
     $scope.logout=function(){
    
        SecurityService.logout(function(response){
            console.log("see response for server");
            console.log(response);
            $location.url('/');
            $localStorage.option=false;
            $scope.option =  $localStorage.option;
            $rootScope.visible  =   false;
            $rootScope.loginVisible =   false;
        });
    }
     $scope.register  =   function(user)
    {
        console.log("entered Register Controller");
        console.log(user);
        $rootScope.visible  =   false; 
        $scope.firstUser="";
        $('.dealerSpecData').hide();
        $('.userSpecData').hide();
        SecurityService.register(user,function(usuario){
            console.log("completed Securicty service for registration Phrase");
            console.log(usuario);
            $state.go('homePageBanner');
//            $location.url('/login');
            
        });
    }

});
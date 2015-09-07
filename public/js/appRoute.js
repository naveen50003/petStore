var example  =   angular.module('appRoutes', ['ui.router','ngStorage']);
console.log("entered app.js");
example.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])
example.config(['$urlRouterProvider','$stateProvider','$httpProvider',function($urlRouterProvider,$stateProvider,$httpProvider)  {
    $urlRouterProvider.otherwise('/');
    $stateProvider
	.state('userPage.viewProfile',{
		url:'/viewProfile',
		templateUrl:'views/viewProfile.html',
        data : { title: 'User Profile' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
        

	})
    .state('homePageBanner',{
		url:'/',
		templateUrl:'views/homePageBanner.html',
        data : { title: 'Home Page' }
//        resolve:{
//            setValues:function($localStorage,$rootScope)
//            {
//                $rootScope.typeOfUser=$localStorage.typeOfUser;
//                $rootScope.currentUser=$localStorage.loginUser;
//                return true;
//            }
//        }
		//controller:'displayPageController'
        //controller:'mainController';

	})
	.state('userPage.biddingGrid',{
		url:'/biddingGrid',
		templateUrl:'views/biddingGrid.html',
        data : { title: 'Bidding Grid' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
        
//		controller: 'brandItemController'
    })
    .state('userPage.viewPet',{
        url:'/viewPet',
        templateUrl:"views/viewPet.html",
        data : { title: 'ViewPet' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
    })
    .state('adminPage.managePet',{
        url:'/managePet',
        templateUrl:"views/managePet.html",
        data : { title: 'Manage Pet' },
        resolve:{
            
            loggein:admincheckLoggedIn
        }
    })
    .state('adminPage.adminUpdatePet',{
        url:'/adminUpdatePet',
        templateUrl:"views/adminUpdatePet.html",
        data : { title: 'Update Pet' },
        resolve:{
            
            loggein:admincheckLoggedIn
        }
    })
    .state('adminPage.manageDealer',{
        url:'/manageDealer',
        templateUrl:"views/manageDealer.html",
        data : { title: 'Manage Dealer' },
        controller:'manageDealerController',
        resolve:{
            
            loggein:admincheckLoggedIn
        }
       
    })
    .state('singlePet',{
        url:'/petGrid/singlePet/:id',
        templateUrl:"views/singlePet.html",
        data : { title: 'Single Pet' }
     
        
    })
    .state('bidding',{
        url:'/petGrid/singlePet/bidding',
        templateUrl:"views/bidding.html",
        data : { title: 'Bidding Page' },
         resolve:{
            
            loggein:usercheckLoggedIn
        }
    })
    
    .state('userPage',{
        url:'/userpage',
        templateUrl:"views/userPage.html",
        data : { title: 'UserPage' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
    })
    .state('adminPage',{
        url:'/adminpage',
        templateUrl:"views/adminPage.html",
        data : { title: 'AdminPage' },
        resolve:{
            
            loggein:admincheckLoggedIn
        }
    })
    .state('petGrid',{
        url:'/petGrid',
        templateUrl:"views/petGrid.html",
        data : { title: 'PetGrid' }
       
    })
    .state('userPage.dealerQueryGrid',{
        url:'/dealerQueryGrid',
        templateUrl:"views/dealerQueryGrid.html",
        data : { title: 'Dealer Query ' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
    })
  .state('userPage.editProfile',{
        url:'/editProfile',
        templateUrl:"views/editProfile.html",
        data : { title: 'Edit Profile ' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
    })
    .state('userPage.userUpdatePet',{
        url:'/userUpdatePet',
        templateUrl:"views/userUpdatePet.html",
        data : { title: 'Update Pet Details' },
        resolve:{
            
            loggein:dealercheckLoggedIn
        }
    })
    
    .state('adminPage.performanceReview',{
        url:'/performanceReview',
        templateUrl:"views/performanceReview.html",
        data : { title: 'PerformanceReview' },
        resolve:{
            
            loggein:admincheckLoggedIn
        }
    })
    .state('adminPage.allotTime',{
        url:'/allotTime',
        templateUrl:"views/alloteTimePage.html",
        data : { title: 'allotTime' },
        resolve:{
            
            loggein:admincheckLoggedIn
        }
    });
    
    $httpProvider.interceptors.push(function($q,$rootScope)
    {
        return{
        
                response:function(response)
                {

                    console.log("push response");
                    console.log(response);
                    
                    return response;
                },
                responseError:function(response)
                {

                    console.log("push responseError");
                   
              
                    if(response.status===401)
                    {
                       alert("Invalid User Please Login again");
                        $rootScope.visible  =   true;
                        $rootScope.loginVisible = true;
                         
                        
                    }
                 console.log($q.reject(response));
                    return $q.reject(response);
//                    return response;
                }
        };
        
    });
    

}]);



//LoginOut Check

var checkLoggedout =function($q,$timeout,$http,$location,$rootScope)
{
    var deffered =$q.defer();
      $http.get('/loggedin').success(function(user)
                                   {
        console.log('checkLoggedin');
        console.log(user);
           
        
        $rootScope.errorMessage=null;
        //User is Authenticated
    
        if(user!=='0')
        {
//            $rootScope.currentUser =user;
//            deffered.resolve();
            console.log("user is there in checkLoggedout");
            deffered.reject();
            
            $location.url('/');
            
        
        }
        //User is Not Authenticated
        else
        {
            console.log("user is  note there in checkLoggedout");
            deffered.resolve();
        
        }
    });
    return deffered.promise;
    
}

// Normal User Check Login In

var usercheckLoggedIn = function($q,$timeout,$http,$location,$rootScope,$localStorage,$state)
{
    var deffered =$q.defer();
    $http.get('/loggedin').success(function(user){
    console.log('checkLoggedin');
    console.log(user);
    $rootScope.errorMessage=null;
        //User is Authenticated
    if($localStorage.loginUser)
        {
            console.log("if case");
            console.log($localStorage.loginUser);
            deffered.reject();  
        }
    else 
    {
        console.log("else case");
        console.log($localStorage.loginUser);
        if(user.typeOfUser==='normaluser')
        {
            console.log("user is checkloggedin");
            $localStorage.loginUser=user.fullname;
            $localStorage.typeOfUser=user.typeOfUser;
            $rootScope.currentUser =$localStorage.loginUser;
            $rootScope.typeOfUser=$localStorage.typeOfUser;
            console.log("value for local Storage");
            console.log($localStorage.loginUser);
            console.log($rootScope.currentUser);
      
            deffered.resolve();
        
        }
        //User is Not Authenticated
        else
        {
            console.log("entered the else block");
            alert("Please Login With User Credentails");
            $rootScope.errorMessage='You need to log in.';
            $rootScope.visible  =   true;
            $rootScope.loginVisible = true;
            deffered.reject();
            
            
//            $state.go('homePageBanner');
        }
    }
    });
    console.log("deffered.promise");
    console.log(deffered.promise);
    
    return deffered.promise
}

// admin Logined IN
var admincheckLoggedIn = function($q,$timeout,$http,$location,$rootScope,$localStorage,$state)
{
    var deffered =$q.defer();
    
    $http.get('/loggedin').success(function(user)
                                   {
        console.log('checkLoggedin');
        console.log(user);
           
        
        $rootScope.errorMessage=null;
        //User is Authenticated
    
        if(user.typeOfUser==='admin')
        {
            console.log("admin is checkloggedin");
            $localStorage.loginUser=user.fullname;
            $localStorage.typeOfUser=user.typeOfUser;
            $rootScope.currentUser =$localStorage.loginUser;
            $rootScope.typeOfUser=$localStorage.typeOfUser;
            console.log("value for local Storage");
            console.log($localStorage.loginUser);
            console.log($rootScope.currentUser);
            deffered.resolve();
        }
        //User is Not Authenticated
        else
        {
            $rootScope.errorMessage='You need to log in.';
            deffered.reject();
            $state.go('homePageBanner');
        }
    });
    console.log("deffered.promise");
    console.log(deffered.promise);
    
    return deffered.promise;
}
//Dealer Logged in

var dealercheckLoggedIn = function($q,$timeout,$http,$location,$rootScope,$localStorage,$state)
{
    var deffered =$q.defer();
    
    $http.get('/loggedin').success(function(user)
                                   {
        console.log('checkLoggedin');
        console.log(user);
        $rootScope.errorMessage=null;
        //User is Authenticated
    
        if(user.typeOfUser==='dealer')
        {
            console.log("admin is checkloggedin");
            $localStorage.loginUser=user.fullname;
            $localStorage.typeOfUser=user.typeOfUser;
            $rootScope.currentUser =$localStorage.loginUser;
            $rootScope.typeOfUser=$localStorage.typeOfUser;
            console.log("value for local Storage");
            console.log($localStorage.loginUser);
            console.log($rootScope.currentUser);
            deffered.resolve();
        }
        //User is Not Authenticated
        else
        {
            $rootScope.errorMessage='You need to log in.';
            deffered.reject();
            $state.go('homePageBanner');
        }
    });
    console.log("deffered.promise");
    console.log(deffered.promise);
    
    return deffered.promise;
}

//Update Details OF login User

var updateLoginDetails = function($localStorage,$rootStorage,$q)
{

    console.log("entered UpdateLogin Details");
//    $rootScope.typeOfUser=$localStorage.typeOfUser;
//    $rootScope.currentUser=$localStorage.loginUser;
return true;
}
var app=angular.module("Interceptor", []);
app.factory('httpInterceptor', ['$q', '$injector',function ($q, $injector,$rootScope) {

        return{
        
                response:function(response)
                {

                    console.log("push response");
                    console.log(response);
                    console.log("interceptors Message");
                    console.log($rootScope.currentUser);
             
                    return response;
                },
                responseError:function(response)
                {

                    console.log("push responseError");
                   
                    $rootScope.user=" ";
//                    if(response.status===401)
//                    {
//                        console.log("wrong User1");
//                         console.log( $rootScope.user);
//                      
//                        $rootScope.user.username="hii";
//                         console.log( $rootScope.user);
//                          console.log("wrong User1");
//                        $location.url('/login');
//                        
//                    }
                 console.log($q.reject(response));
                    return $q.reject(response);
//                    return response;
                }
        };
        
} ]);
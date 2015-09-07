var LocalStrategy   = require('passport-local').Strategy;

module.exports  =function(passport,User){
    passport.serializeUser(function(user,done){
        console.log("entered serialization");
//        console.log(User.users);
        console.log(user);
        done(null,user);
    });
    passport.deserializeUser(function(user,done){
         console.log("entered deserialization");
            console.log(user);
        var userDup={
            email:user.email,
            typeOfUser:user.typeOfUser
        }
         done(null,userDup);
    });
//    passport.deserializeUser(function(id, done) {
//        User.findById(id, function(err, user) {
//            
//            console.log("deserilaization enters");
//            console.log(id);
//        done(err, user);
//        });
//    });
    passport.use('local-login',new LocalStrategy(
        function(username,password,done){
        User.findOne({'users.email':username},function(err,user){
                   if(err)
                     return done(err);
                   if(user)
                   {
                       console.log("user Exists");
                       console.log(password);
                       console.log(user.users.password);
                       var verifyPassword=user.validPassword(password,user.users.password);
//                       console.log(User.validPassword(user.users.password));
                       console.log(verifyPassword);
                       if(verifyPassword)
                            return done(null, user.users);
                       else
                           return done(null,false);


                   }
                   else
                   {
                      console.log("User Not Exists");
                       return done(null,false);

                   }
        //    return done(null,false,{message:'Unable to Login'});
           })
        }
   ));
}
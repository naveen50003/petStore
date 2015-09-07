module.exports = function(app, passport,User) {
 app.post('/register',function(req,res)
    {
        console.log("server register phrase");
        console.log("user doesnt exists");
        console.log(req.body.user);
        var newNormalUser = new User();
        newNormalUser.users.email =  req.body.user.email;

        var encrptPassword=newNormalUser.generateHash(req.body.user.password);
        newNormalUser.users.password = encrptPassword ;
        newNormalUser.users.fullname =  req.body.user.fullname;
        newNormalUser.users.gender =  req.body.user.gender;
        newNormalUser.users.phno    =req.body.user.phno;
     
        encrptPassword=newNormalUser.generateHash(req.body.user.rePassword);
        newNormalUser.users.rePassword=encrptPassword;
        newNormalUser.users.typeOfUser=req.body.user.typeOfUser;
        newNormalUser.users.address=req.body.user.address;
        newNormalUser.users.proofOfPerson=req.body.user.idproof;
      
        newNormalUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                  res.send(200);
                });

    });
    app.get('/hello',auth,function(req,res)
    {
        console.log("entered hello page");
        res.send('hello World');

    });
    app.get('/loggedin',function(req,res)
    {
        res.send(req.isAuthenticated() ? req.user :'0');
    });
    app.get('*', function(req, res){
      res.send('Page Not Found');
    });
    app.post('/login',passport.authenticate('local-login',{failureFlash:'Invalid User'}),function(req,res)
    {
    console.log("server login phrase");
    
    res.send(req.user);
    });
    app.post('/logout',function(req,res)
             {
        req.logOut();
        console.log("entered logout function");
        res.send(200);
    });
     app.get('/', function(request, response){

	response.sendfile('index.html');
     });

};
var auth=function(req,res,next)
    {
        if(!req.isAuthenticated())
             res.redirect('/#/login');
        else
            next();
    };
$(document).ready(function(){
                 var a=1;
                $("#menu-toggle").click(function(){
                    console.log("entered animation");

                   
                    if(a==1){
                        
                        $('html').addClass('menu-open');
                        $('#menu .container').addClass('slideAnimateBegin'); 
                        $(".slideAnimateBegin ul").animate({left: '1px',position:'absolute'},"slow",function() {
                        $('#menu .container').removeClass('slideAnimateBegin');})
                        a=0;
                    }
                    else {
                       
                        $('#menu .container').addClass('slideAnimateClose'); 
                        $(".slideAnimateClose ul").animate({left: '-200px',position:'absolute'},"slow",function() {
                            $('#menu .container').removeClass('slideAnimateBegin');
                            
                        })
//                        $('html').toggleClass('menu-open');
                       
                        a=1;
                    }
                });
			
			
                $("#searchIcon").click(function(){
                $('html').slideToggle('search-open')
                })
                $("#menu ul li").click(function() {
                    console.log("required");
                    $('#menu .container').addClass('slideAnimateClose'); 
                    $(".slideAnimateClose ul").animate({left: '-200px',position:'absolute'},"slow",function() {
                        $('#menu .container').removeClass('slideAnimateClose');
                        })
                    a=1;
                })
			});
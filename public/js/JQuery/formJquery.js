$(document).ready(function(){
    console.log("entered jquery");
$(".typeOfWebUser").on('change',function() {
    
       console.log($(this).find('option:selected').text());
       var typeOfUser   =   $(this).find('option:selected').text();
       if(typeOfUser === "Dealer"|| typeOfUser === "Admin")  {
           
           $('.dealerSpecData').show();
           $('.userSpecData').hide();
       }
       else if(typeOfUser === "Normal User")    {
           
           $('.userSpecData').show();
           $('.dealerSpecData').hide();
       }
       else {
            $('.userSpecData').hide();
            $('.dealerSpecData').hide();
       }
    
    });
});
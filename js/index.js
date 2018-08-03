	
	$lis = $('.lunbotu li');
	$ols = $('.nav-dian li');
	var timer = null;
    timer = setInterval(autoPlay,3000);
    var index = 0;
    function autoPlay(){
   		index++;
   		if( index == $lis.length ){
   			index = 0;
   		}
   		
   		$lis.eq(index).addClass("active").siblings().removeClass("active");
   		$ols.eq(index).addClass("active1").siblings().removeClass("active1");

    }
       
    
    
	
	
	
	
	


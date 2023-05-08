/**
 * File oas.js.
 *
 * Handles all the JavaScripts of the OAS enhancements.
 * Developed by Suman Shrestha (www.sumanshresthaa.com.np / suman.shrestha2009@gmail.com)
 */

var $ = jQuery.noConflict();

jQuery( document ).ready( function( $ ) { 

	"use strict";
	 
	// Menu Trigger
	$('#menuToggle').on('click', function(event) {
		var windowWidth = $(window).width();   		 
		if (windowWidth<1010) { 
			$('body').removeClass('open'); 
			if (windowWidth<760){ 
				$('#left-panel').slideToggle(); 
			} else {
				$('#left-panel').toggleClass('open-menu');  
			} 
		} else {
			$('body').toggleClass('open');
			$('#left-panel').removeClass('open-menu');  
		} 
			 
	}); 

	 
	$(".menu-item-has-children.dropdown").each(function() {
		$(this).on('click', function() {
			var $temp_text = $(this).children('.dropdown-toggle').html();
			$(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
		});
	});


	// Load Resize 
	$(window).on("load resize", function(event) { 
		var windowWidth = $(window).width();  		 
		if (windowWidth<1010) {
			$('body').addClass('small-device'); 
		} else {
			$('body').removeClass('small-device');  
		} 
		
	});



	//Enable check and uncheck all functionality
    $('.checkbox-toggle').click(function () {
      	var clicks = $(this).data('clicks')
      	if (clicks) {
        	//Uncheck all checkboxes
        	$('.mailbox-messages input[type=\'checkbox\']').prop('checked', false)
        	$('.checkbox-toggle .far.fa-check-square').removeClass('fa-check-square').addClass('fa-square')
      	} else {
	        //Check all checkboxes
	        $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true)
	        $('.checkbox-toggle .far.fa-square').removeClass('fa-square').addClass('fa-check-square')
      	}
      	$(this).data('clicks', !clicks)
    })

    //Handle starring for font awesome
    $('.mailbox-star').click(function (e) {
      	e.preventDefault()
      	//detect type
      	var $this = $(this).find('a > i')
      	var fa    = $this.hasClass('fa')

      	//Switch states
      	if (fa) {
        	$this.toggleClass('fa-star')
        	$this.toggleClass('fa-star-o')
      	}
    })

    /** App Menu Toggle **/ 
    $('.menu-item > a').click(function(e){
    	e.preventDefault();
    	$(this).next('.sub-menu').slideToggle();
  	});

  	/** Bootstrap Tooltip **/ 
	jQuery("a[data-toggle=tooltip], button[data-toggle=tooltip], span[data-toggle=tooltip]").tooltip();
	  $(function () {
	      $('[data-toggle="tooltip"]').tooltip()
	});
 
} );


$(document).ready(function() {
    $(".list-group-item").click(function(e) {
        e.preventDefault();
        $(this).closest('.list-group').find('.list-group-item').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('id');
        console.log(id);
        $('.oas-tab .oas-tab-content').removeClass('active');
        $('.'+id).addClass('active');
    });
});



/* Employee form accordian always keep at least 1 open by preventing the current to close itself */
$('[data-toggle="collapse"]').on('click',function(e){
    if ( $(this).parents('.accordion').find('.collapse.show') ){
        var idx = $(this).index('[data-toggle="collapse"]');
        if (idx == $('.collapse.show').index('.collapse')) {
            // prevent collapse
            e.stopPropagation();
        }
    }
});




//DISABLE F12 FOR WEB BROWSER
document.onkeypress = function (event) {  
    event = (event || window.event);  
    if (event.keyCode == 123) {  
    return false;  
    }  
}  
document.onmousedown = function (event) {  
    event = (event || window.event);  
    if (event.keyCode == 123) {  
    return false;  
    }  
}  
document.onkeydown = function (event) {  
    event = (event || window.event);  
    if (event.keyCode == 123) {  
    return false;  
    }  
}  


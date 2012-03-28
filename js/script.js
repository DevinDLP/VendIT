var animSpeed = 0.25;
var prevShades = [];

$(document).ready(function() {
	$('html').click(function(e){
		e.stopPropagation();
		if($('#shade_container').is(':visible')) {
			if(!$('#right_col, #shade_container').is(':animated')) {
				if ($('#product_search_box').attr('class') == 'product_search_box_selected')
					$('#product_search_box').attr('class', 'product_search_box');
					
				$('#nav_categories').children('li').each(function () {
					if ($(this).attr('class') == 'nav_selected_main_cat')
						$(this).attr('class', 'nav_main_cat');
				});
				closeShade({ back: true });
			}
		}
	});
	
	$('#product_search_box').click(function(e){
		e.stopPropagation();
		$('#product_search_box').val('');
	});
	
	$('#product_search_box').keypress(function(e){
		if(e.keyCode == 13 && !$('#right_col, #shade_container').is(':animated')) {
			searchProducts($('#product_search_box').val());
			
			if($('#product_search_box').attr('class') == 'product_search_box')
				$('#product_search_box').attr('class', 'product_search_box_selected');
				
			$('#nav_categories').children('li').each(function () {
				if ($(this).attr('class') == 'nav_selected_main_cat')
					$(this).attr('class', 'nav_main_cat');
			});
		}
	});
	/*
	   $("#special").click(function(e){

	var x = e.pageX - this.offsetLeft;
	var y = e.pageY - this.offsetTop;

      $('#status2').html(x +', '+ y);
   });
   */
	$('#carousel_hover_left').bind('mouseenter', function() {
    	this.iid = setInterval(function() {
			$('#product_carousel').css('left', '+=6');         
    	}, 25);
	}).bind('mouseleave', function(){
    	this.iid && clearInterval(this.iid);
	});
	
	$('#carousel_hover_right').bind('mouseenter', function() {
    	this.iid = setInterval(function() {
			$('#product_carousel').css('left', '-=6');         
    	}, 25);
	}).bind('mouseleave', function(){
    	this.iid && clearInterval(this.iid);
	});
	
	$('.product_card_container').live({
		click: function() {
			$(this).find('.pc_title').stop(true).css('margin-left', '0');
		},
		mouseover: function() {
			scrollCardTitle($(this).find('.pc_title_container'));
		},
		mouseout: function() {
			$(this).find('.pc_title').stop(true).css('margin-left', '0');
		}
	});
	loadTrending();
});

function searchProducts(search_query) {
	$.ajax({
		type: 'POST',
		url: 'inc/catalog.php',
		data: 'RequestType=3&SearchQuery=' + search_query,
		dataType: 'html',
		success: function(rsp) { 
			displayResponse(rsp, { clearShades : true, shadeType : 'productList' }); 
		}
	});
}

function loadTrending() {
	$.ajax({
		type: 'POST',
		url: 'inc/catalog.php',
		data: 'RequestType=0',
		dataType: 'html',
		success: function(rsp) { $('#product_carousel').empty().append(rsp); }
	});
}

function loadCategory(e, category) {
	e.stopPropagation();
	
	if(!$('#right_col, #shade_container').is(':animated')) {
		if ($('#product_search_box').attr('class') == 'product_search_box_selected')
			$('#product_search_box').attr('class', 'product_search_box');
		
		$('#nav_categories').children('li').each(function () {
			if($(this).attr('class') == 'nav_selected_main_cat')
				$(this).attr('class', 'nav_main_cat');
		});

		var cat_id = '#cat_' + category;
		if($(cat_id).attr('class') == 'nav_main_cat')
			$(cat_id).attr('class', 'nav_selected_main_cat');
				
		$.ajax({
			type: 'POST',
			url: 'inc/catalog.php',
			data: 'RequestType=2&Category=' + category,
			dataType: 'html',
			success: function(rsp) { 
				displayResponse(rsp, { clearShades : true, shadeType : 'productList' });
			}
		});
	}
}

function viewProduct(e, product) {
	e.stopPropagation();
	if(!$('#right_col, #shade_container').is(':animated')) {
		$.ajax({
			type: 'POST',
			url: 'inc/product.php',
			data: 'ProductID=' + product,
			dataType: 'html',
			success: function(rsp) { displayResponse(rsp); }
		});
	}
}

function displayResponse(rsp, options, callback) {
	var default_args = {  
		'shadeType' : 'default',
		'shadeName' : 'none',
		'back' : false,
		'clearShades' : false
	}
	if($.type(rsp) != 'string') {
		callback = options;
		options = rsp;
		rsp = '';
	}
	if($.type(options) == 'object') {
		for(var index in default_args)
			if($.type(options[index]) == 'undefined') 
				options[index] = default_args[index];
	} else {
		callback = options;
		options = default_args;
	}
	
	if(options.clearShades)
		prevShades = [];

	if($('#shade_container').is(':visible')) {
		closeShade(rsp, options, callback);
	} else {
		openShade(rsp, options, callback);
	}
}

function openShade(rsp, options, callback) {
	var default_args = {
		'shadeType' : 'default',	
		'shadeName' : 'none',
		'back' : false,
		'clearShades' : false
	}
	if($.type(rsp) != 'string') {
		callback = options;
		options = rsp;
		rsp = '';
	}
	if($.type(options) == 'object') {
		for(var index in default_args)
			if($.type(options[index]) == 'undefined') 
				options[index] = default_args[index];
	} else {
		callback = options;
		options = default_args;
	}
			
	var shadeHeight = 0;
	var rightColHeight = 0;
	
	if(!options.back) {
		if(!(prevShades.length > 0 && $('#shade_nav', prevShades[prevShades.length -1]))) {
			var $response_html = $(rsp);
			$('#response_html', $response_html).append("NO");
			console.log($response_html.find('div').text());
		} else {
			//console.log($('#shade_nav', prevShades[prevShades.length -1]));
			//console.log($(prevShades[prevShades.length -1]).contents());
		}
		prevShades.push(rsp);
	}
		
	$('#shade').css({ height: 'auto' }).empty().append(rsp);
		
	rightColHeight = $('#right_col').height();
	$('#shade_container').css({ display: 'block', visibility: 'hidden' });
	shadeHeight = $('#shade').height();
	$('#shade_container').css({ display: 'none', visibility: 'visible' });
		
	if(shadeHeight < rightColHeight) {
		shadeHeight = rightColHeight;
		$('#shade').css({ height: '100%' });
	}
		
	$('#right_col').animate({ 'margin-top': -(shadeHeight) }, { duration: shadeHeight * animSpeed, queue: false, complete: function() { $('#right_col').hide(); }});
	$('#shade_container').show().animate({ height: shadeHeight }, { duration: shadeHeight * animSpeed, queue: false, 
		complete: function() { 
			if(shadeHeight > rightColHeight)
				$('#shade_container').css({ height: '100%' });
		}
	});
	
	if(callback) {
		var wait = setInterval(function() {
			if(!$('#right_col, #shade_container').is(':animated')) {
				clearInterval(wait);
				callback();
			}
		}, 200);
	}
}

function closeShade(rsp, options, callback) {
	var default_args = {
		'shadeType' : 'default',
		'shadeName' : 'none',
		'back' : false,
		'clearShades' : false
	}
	if($.type(rsp) != 'string') {
		callback = options;
		options = rsp;
		rsp = '';
	}
	if($.type(options) == 'object') {
		for(var index in default_args)
			if($.type(options[index]) == 'undefined') 
				options[index] = default_args[index];
	} else {
		callback = options;
		options = default_args;
	}
			
	$('#right_col').css({ 'margin-top': -($('#shade_container').height()) });
	$('#shade_container').animate({ height: 0 }, { duration: $('#shade').height() * animSpeed, queue: false, complete: function() { $('#shade_container').hide(); }});
	$('#right_col').show().animate({ 'margin-top': 0 }, { duration: parseInt($('#right_col').css('margin-top')) * -(animSpeed), queue: false});
	
	if(prevShades.length > 0 || rsp) {
		var wait = setInterval(function() {
			if(!$('#right_col, #shade_container').is(':animated')) {
				clearInterval(wait);
				if(options.back) {
					prevShades.pop();
					if(prevShades.length == 0)
						rsp = '';
					else
						rsp = prevShades[prevShades.length-1];
				}
				if(rsp)
					openShade(rsp, options, callback);
			}
		}, 200);
	}
}

function scrollCardTitle(card) {
	if(card.find('.pc_title').width() > card.width()) {
		card.find('.pc_title').stop(true).animate({ 
			marginLeft: -((card.find('.pc_title').width()) - (card.width()) + 16) }, ((card.find('.pc_title').width()) * 10),
			function(){ 
				card.find('.pc_title').stop(true).animate({
					marginLeft: '0px' }, (card.find('.pc_title').width() * 10), 
					function() {
						scrollCardTitle(card);
					}
				);
			}
		);
	}
}
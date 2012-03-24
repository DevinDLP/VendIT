var speed = 300;
var mobileView = false;
var animating = false;
var changed = true;

$(document).ready(function(){
	
	$(window).resize(function() {
		toggleMobileView();
	});
	
	$('.scroll-pane').bind('jsp-initialised', 
		function(event, isScrollable){
			$(this).find('.jspVerticalBar').hover(function(event){
				event.preventDefault();
				$(this).animate({ width: '20px' }, { duration: 100, queue: false });
				$(this).find('.jspDrag').animate({ opacity: 0.9, width: '15px' }, { duration: 100, queue: false });
				$(this).find('.jspArrow').animate({ opacity: 1 }, { duration: 100, queue: false });
			}, function(event){
				event.preventDefault();
				$(this).animate({ width: '10px' }, { duration: 100, queue: false });
				$(this).find('.jspDrag').animate({ opacity: 0.6, width: '3px' }, { duration: 100, queue: false });
				$(this).find('.jspArrow').animate({ opacity: 0 }, { duration: 100, queue: false });
			});
		}).jScrollPane({
			autoReinitialise: true,
			showArrows: true,
			verticalGutter: 10,
			hideFocus: true
	});
		
	$('#carousel_button_right').click(function(){
		var numToMove = Math.floor($('#product_carousel_container').width() / 184) - 1;
		var leftMargin = parseInt($('#product_carousel').css('margin-left').replace('px', ''));
		$('#product_carousel').animate({marginLeft:  leftMargin - (numToMove * 184) + 'px'}, speed);
	});
	
	$('#carousel_button_left').click(function(){
		var numToMove = Math.floor($('#product_carousel_container').width() / 184) - 1;
		var leftMargin = parseInt( $('#product_carousel').css('margin-left').replace('px', ''));
		if (leftMargin < 91) {
			leftMargin += (numToMove * 184);
			$('#product_carousel').animate({marginLeft:  leftMargin + 'px'}, speed);
		}
	});
	
	$('#username').click(function(e){
		e.stopPropagation();
		$('#username').val('');
	});
	
	$('#password').click(function(e){
		e.stopPropagation();
	});
	
	$('#product_search_box').click(function(e){
		e.stopPropagation();
		$('#product_search_box').val('');
	});
	
	$('#product_search_box').keypress(function(e){
		if(e.keyCode == 13) {
			searchProducts($('#product_search_box').val());
			
			if($('#product_search_box').attr('class') == 'product_search_box')
				$('#product_search_box').attr('class', 'product_search_box_selected');
				
			$('#nav_categories').children('li').each(function () {
				if ($(this).attr('class') == 'nav_selected_main_cat')
					$(this).attr('class', 'nav_main_cat');
			});
		}
	});
	
	$('#shade').click(function(e){
		e.stopPropagation();
	});
	
	$('body').click(function(){
		$('#shade').animate({height: 0 + 'px'}, 500);
		
		if ($('#product_search_box').attr('class') == 'product_search_box_selected')
			$('#product_search_box').attr('class', 'product_search_box');
			
		$('#nav_categories').children('li').each(function () {
			if ($(this).attr('class') == 'nav_selected_main_cat')
				$(this).attr('class', 'nav_main_cat');
		});
	});
	
	loadTrending();
});

function toggleMobileView() {
	if ($(window).width() <= 750 && !mobileView && changed ) {
		mobileView = true;
		changed = false;
	} else if ($(window).width() > 750 && mobileView && changed) {
		mobileView = false;
		changed = false;
	}
	
	console.log(mobileView + ' ' + changed + ' ' + animating);
	
	if( mobileView && !animating && !changed ) {
		animating = true;
		setTimeout("animating = false", 400);
	    $('#left_col_container').animate({
			width: '0',
			opacity: '0'
		}, { duration: 400, queue: false }, function() { 
			$('#left_col_container').hide(); 
		});
		$('#right_col_content').animate({
			marginLeft: '0px'
		}, { duration: 400, queue: false });
		$('#header_container').animate({
			marginLeft: '0px',
			marginTop: '-70px'
		}, { duration: 400, queue: false });
		$('#footer_container').animate({
			marginLeft: '0px'
		}, { duration: 400, queue: false });
		$('#logo').animate({
			marginLeft: '0px',
		}, { duration: 400, queue: false });
		changed = true;
		
	} else if ( !mobileView && !animating && !changed ) {
		animating = true;
		setTimeout("animating = false", 400);
		$('#left_col_container').show();
	    $('#left_col_container').animate({
			width: '150px',
			opacity: '1'
		}, { duration: 400, queue: false });
		$('#footer_container').animate({
			marginLeft: '150px'
		}, { duration: 400, queue: false });
		$('#header_container').animate({
			marginLeft: '150px',
			marginTop: '0px'
		}, { duration: 400, queue: false });
		$('#right_col_content').animate({
			marginLeft: '150px'
		}, { duration: 400, queue: false });
		$('#logo').animate({
			marginLeft: '-50px',
		}, { duration: 400, queue: false });
		changed = true;
	}
}

function searchProducts(search_query) {
	$.ajax({
		type: "POST",
		url: "inc/catalog.php",
		data: "RequestType=3&SearchQuery=" + search_query,
		success: function(rsp) { displayResponse(rsp); }
	});
}

function loadTrending() {
	$.ajax({
		type: "POST",
		url: "inc/catalog.php",
		data: "RequestType=0",
		success: function(rsp) { loadCarousel(rsp); }
	});
}

function loadCategory(event, category) {
	event.stopPropagation();
	
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
		type: "POST",
		url: "inc/catalog.php",
		data: "RequestType=2&Category=" + category,
		success: function(rsp) { displayResponse(rsp); }
	});
}

function loadCarousel(rsp) {
	$('#product_carousel').empty().append(rsp);
	bindCardHover();
}

function bindCardHover() {
	$('.product_card_container').hover(function() {
		if($(this).find('.pc_title').width() > $(this).width()) {
			$(this).find('.pc_title').animate({ 
				marginLeft: -($(this).find('.pc_title').width() - $(this).find('.pc_title_container').width() + 15) }, { 
				duration: $(this).find('.pc_title').width() * 10 
			});
		}
	}, function() {
		$(this).find('.pc_title').stop(true).css('margin-left', '0');
	});
}

function displayResponse(rsp) {
	$('#shade').animate({height: 0 + 'px'}, 500, function() {$('#shade_content').empty().append(rsp); bindCardHover();});
	$('#shade').animate({height: '100%'}, 500);
}

function addToCart(event, product) {
	event.stopPropagation();
	alert("You added a " + product + " to your cart! Too bad Devin never finished implementing the shopping cart/checkout.");
}

function viewProduct(event, product) {
	event.stopPropagation();
	$.ajax({
		type: "POST",
		url: "inc/product.php",
		data: "ProductID=" + product,
		success: function(rsp) { displayResponse(rsp); }
	});
}


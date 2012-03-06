$(document).ready(function(){
	var speed = 600;
	$('#navNext').click(function(){
		var leftMargin = parseInt( $('#carousel').css('margin-left').replace('px', '') ) - 740;
		$('#carousel').animate({marginLeft:  leftMargin + 'px'}, speed);
	});
	$('#navPrev').click(function(){
		var leftMargin = parseInt( $('#carousel').css('margin-left').replace('px', '') );
		if (leftMargin < 0) {
			leftMargin += 740;
			$('#carousel').animate({marginLeft:  leftMargin + 'px'}, speed);
		}
	});
	$('#username').click(function(e){
		e.stopPropagation();
		$('#username').val('');
	});
	$('#password').click(function(e){
		e.stopPropagation();
	});
	$('#search').click(function(e){
		e.stopPropagation();
		$('#search').val('');
	});
	$('#search').keypress(function(e){
		if(e.keyCode == 13) {
			searchProducts($('#search').val());
		}
	});
	
	$('#content_shade').click(function(e){
		e.stopPropagation();
	});
	
	$('body').click(function(){
		$('#content_shade').animate({height: 0 + 'px'}, 500);
		$('#nav_categories').children('li').each(function () {
			if($(this).attr('class') == 'nav_selected_main_cat') {
				$(this).attr('class', 'nav_main_cat');
			} else if($(this).attr('class') == 'nav_selected_sub_cat') {
				$(this).attr('class', 'nav_sub_cat');
			}
		});
	});
	
	loadTrending();
});

function searchProducts(search_query) {
	var xhr = new XMLHttpRequest();
	if (xhr) {
		xhr.onreadystatechange = function() { 
			displayResponse(xhr);
		}
	}
	xhr.open("GET", "inc/catalog.php?RequestType=3&SearchQuery=" + search_query, true);
	xhr.send(null);
}

function loadTrending() {
	var xhr = new XMLHttpRequest();
	if (xhr) {
		xhr.onreadystatechange = function() { 
			loadCarousel(xhr);
		}
	}
	xhr.open("GET", "inc/catalog.php?RequestType=0", true);
	xhr.send(null);
}

function loadCategory(event, category) {
	event.stopPropagation();
	$('#nav_categories').children('li').each(function () {
		if($(this).attr('class') == 'nav_selected_main_cat') {
			$(this).attr('class', 'nav_main_cat');
		} else if($(this).attr('class') == 'nav_selected_sub_cat') {
			$(this).attr('class', 'nav_sub_cat');
		}
	});

	var cat_id = '#cat_' + category;
	if($(cat_id).attr('class') == 'nav_main_cat')
		$(cat_id).attr('class', 'nav_selected_main_cat');
		
	if($(cat_id).attr('class') == 'nav_sub_cat')
		$(cat_id).attr('class', 'nav_selected_sub_cat');
			
	var xhr = new XMLHttpRequest();
	if (xhr) {
		xhr.onreadystatechange = function() { 
			displayResponse(xhr);
		}
	}
	xhr.open("GET", "inc/catalog.php?RequestType=2&Category=" + category, true);
	xhr.send(null);
}

function loadCarousel(xhr) {
	if (xhr.readyState == 4) {
		if (xhr.status == 200 || xhr.status == 304) {
			document.getElementById('carousel').innerHTML = xhr.responseText;
		}
	}
}

function displayResponse(xhr) {
	if (xhr.readyState == 4) {
		if (xhr.status == 200 || xhr.status == 304) {
			$('#content_shade').animate({height: 0 + 'px'}, 500);
			setTimeout(function() {document.getElementById('content_shade').innerHTML = xhr.responseText;},500);
			$('#content_shade').animate({height: 725 + 'px'}, 500);
		}
	}
}

function addToCart(event, product) {
	event.stopPropagation();
	alert("You added a " + product + " to your cart! Too bad Devin never finished implementing the shopping cart/checkout.");
}

function viewProduct(event, product) {
	event.stopPropagation();
	var xhr = new XMLHttpRequest();
	if (xhr) {
		xhr.onreadystatechange = function() { 
			displayResponse(xhr);
		}
	}
	xhr.open("GET", "inc/product.php?ProductID=" + product, true);
	xhr.send(null);
}


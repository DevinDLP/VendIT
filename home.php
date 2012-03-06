<?php
	require( "inc/globals.php" );

	mysql_connect( $DB_HOST, $DB_USER, $DB_PASS ) or die( mysql_error() );
	mysql_select_db( $DB_NAME ) or die( mysql_error() );

	$categories = mysql_query( "SELECT * FROM categories" ) or die( mysql_error() ); 
	$featured_products = mysql_query( "SELECT * FROM products, featured WHERE featured.product_id = products.product_id" ) or die( mysql_error() );
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<title>vendIT Home - Devin de la Parte</title>
		<meta name="description" content="vendIT is the one stop shop for all of your electronics needs online.  We carry a wide variety of computers, parts, televisions, games, and toys for kids of all ages." />
		<meta name="keywords" content="IT, Electronics, Shopping, Computer, Television, Parts, Audio, Video, Stereo, Camcorder, MP3 Player, Monitor, Phone, GPS, Auto" />
		<style type="text/css">
			@import url("css/reset.css");
			@import url("css/styles.css");
		</style>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
	</head>
	
	<body>
		<div class="center_col">
			<div class="logo_container">
				<a href="home.php"><img id="logo" class="logo" src="img/vendit_logo.png" alt="vendIT" /></a>
			</div>
			<div class="nav_container">
				<ul id="nav_categories" class="nav_categories">
					<li><input type="text" id="search" class="search_box" value="Search" /></li>
					<?php
						while( $category = mysql_fetch_array( $categories, MYSQL_BOTH ) )
							echo "<li class='nav_main_cat' id='cat_".$category['category_id']."' onclick='loadCategory(event,\"".$category['category_id']."\")'>".$category['category']."</li>";
					?>
				</ul>
			</div>
			<div class="primary_container">
				<div class="top_bar">
					<form class="login_box">
						<input type="text" id="username" class="username" value="Username" />
						<input type="password" id="password" class="password" />
						<div id="check_out" class="check_out">Check Out &#187;</div>
						<input type="button" id="login" class="login" value="Login" />
					</form>
				</div>
				
				<div id="content_shade" class="content_shade">
				</div>
				
				<div class="featured_product_container">
					<div class="title_top"><img class="feature_product_title" src="img/feature_product.png" alt="Feature Product" /></div>
					<div class="featured_product">
						<?php
							$featured_product = mysql_fetch_array( $featured_products, MYSQL_BOTH ); 
							echo "<img class='featured_product_img' src='img/".$featured_product['product_image']."' alt='".$featured_product['product_name']."' />";
							echo "<div class='featured_product_info'>";
							$blank_stars = 5 - $featured_product['rating'];
							for($stars = 5; $stars > 0; $stars--) {
								if($blank_stars > 0) {
									echo "<div class='blank_star'></div>";
								} else {
									echo "<div class='filled_star'></div>";
								}
								$blank_stars--;
							}
							echo "<h1>".$featured_product['product_name']."</h1><br/>";
							echo "<div class='featured_product_buy' onclick='addToCart(event,\"".$featured_product['product_id']."\");'><img src='img/shopping_cart.png' alt='Add to Cart' /></div>";
							$info_item = explode(",", $featured_product['info']);
							foreach($info_item as $info)
								echo $info."<br/>";
							echo $featured_product['description']."<br/>";
							echo "<h2>Price: </h2><h3>$".number_format($featured_product['price'], 2)."</h3>";
							echo "</div>";
						?>
					</div>
				</div>
				
				<div class="blog_container">
					<div class="title_top"><img class="blog_title" src="img/blog.png" alt="The v-Blog" /></div>
					<div class="blog">
						<div class="blog_title"><h1>Tech News for 23-10-2011</h1></div><br/>
						<p class="blog_text">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</div>
				
				<div class="product_carousel_container">
					<div id="navPrev" class="carousel_button_left">&#171;</div>
					<div id="navNext" class="carousel_button_right">&#187;</div>
					<ul id="carousel" class="product_carousel"></ul>
				</div>
				
				<div class="footer">
					This site is not official and is an assignment for a UCF Digital Media course.<br/>
					Designed by Devin de la Parte
				</div>
			</div>
		</div>
	</body>
	
</html>

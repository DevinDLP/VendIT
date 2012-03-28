<?php
	require( "inc/globals.php" );

	mysql_connect( $DB_HOST, $DB_USER, $DB_PASS ) or die( mysql_error() );
	mysql_select_db( $DB_NAME ) or die( mysql_error() );

	$categories = mysql_query( "SELECT * FROM categories" ) or die( mysql_error() ); 
	$featured_products = mysql_query( "SELECT * FROM products, featured WHERE featured.product_id = products.product_id" ) or die( mysql_error() );
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
		<title>vendIT Home - Devin de la Parte</title>
		<meta name="description" content="vendIT is the one stop shop for all of your electronics needs online.  We carry a wide variety of computers, parts, televisions, games, and toys for kids of all ages." />
		<meta name="keywords" content="IT, Electronics, Shopping, Computer, Television, Parts, Audio, Video, Stereo, Camcorder, MP3 Player, Monitor, Phone, GPS, Auto" />
		
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> 
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 
		<script type="text/javascript" src="js/script.js"></script>
		
		<style type="text/css">
			@import url("css/reset.css");
			@import url("css/styles.css");
			@import url("http://fonts.googleapis.com/css?family=Michroma|Anonymous+Pro");
		</style>

	</head>
	<body>
		<div id="bg_header">
		</div>
		
		<div id="primary_container">

			<div id="header_container">
				<div id="header_content">
					<div id="header">
						<a href="home.php" alt="VendIT"><img id="logo" src="img/vendit_logo.png" alt="vendIT" /></a>
					</div>
				</div>
			</div>

			<div id="right_col_container">
				<div id="right_col_content">
					<div id="right_col_border">
						<div id="shade_container">
							<div id="shade_content">
								<div id="shade">
								</div>
							</div>
						</div>
						
						<div id="right_col">
							<div id="top_content">
								<div id="blog_container">
									<div id="blog_content">
										<div class="title_top">The v-Blog</div>
										<div id="blog">
											<span class="blog_title"><h1>Tech News for 23-10-2011</h1></span><br/>
											<p class="blog_text">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
											</p>
										</div>
									</div>
								</div>
								
								<div id="feature_product_container">
									<div class="title_top">Feature Product</div>
									<div id="feature_product_content">

											<?php
													$featured_product = mysql_fetch_array( $featured_products, MYSQL_BOTH ); 
													echo "<img id='featured_product_img' src='img/".$featured_product['product_image']."' alt='".$featured_product['product_name']."' />";
													echo "<div id='featured_product_info'>";
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
													$info_item = explode(",", $featured_product['info']);
													foreach($info_item as $info)
														echo $info."<br/>";
													echo $featured_product['description']."<br/>";
													echo "<h2>Price: </h2><h3>$".number_format($featured_product['price'], 2)."</h3>";
													echo "</div>";
													//echo "<div id='featured_product_buy' onclick='addToCart(event,\"".$featured_product['product_id']."\");'><img src='img/shopping_cart.png' alt='Add to Cart' /></div>";
											?>
				
									</div>
								</div>
							</div>
							
							<div id="product_carousel_container">
								<div id="carousel_hover_left"></div>
								<div id="carousel_hover_right"></div>
								<div id="carousel_button_left">&#171;</div>
								<div id="carousel_button_right">&#187;</div>
								<ul id="product_carousel"></ul>
							</div>
						
						</div>
					</div>
					
					<div id="footer_container">
						<div id="footer_content">
							<div id="footer">
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="left_col_container">
				<div id="left_col_content">
					<div id="left_col">
						<ul id="nav_categories">
							<li><input id="product_search_box" class="product_search_box" type="text" value="Search" /></li>
							<?php
								while( $category = mysql_fetch_array( $categories, MYSQL_BOTH ) )
									echo "<li class='nav_main_cat' id='cat_".$category['category_id']."' onclick='loadCategory(event,\"".$category['category_id']."\")'>".$category['category']."</li>";
							?>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<div id="bg_footer">
		</div>
	</body>
</html>

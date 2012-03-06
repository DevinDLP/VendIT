<?php 
	require( "globals.php" );

	if( isset( $_POST['RequestType'] ) ) {
		$request_type = $_POST['RequestType'];

		mysql_connect( $DB_HOST, $DB_USER, $DB_PASS ) or die( mysql_error() ); mysql_select_db( $DB_NAME ) or die( mysql_error() );

		if( $request_type == $LOAD_TRENDING ) { 
			$result = mysql_query( "SELECT * FROM products ORDER BY purchased_recently DESC" ) or die( mysql_error() );
		} else if( $request_type == $LOAD_RECOMMENDED && isset( $_SESSION['Username'] ) ) {

		} else if( $request_type == $LOAD_CATEGORY && isset( $_POST['Category'] ) ) { 
			$category_type = $_GET['Category']; 
			$result = mysql_query( "SELECT * FROM products WHERE category='".$category_type."' ORDER BY purchased_recently DESC" ) or die( mysql_error() ); 
		} else if( $request_type == $LOAD_SEARCH && isset( $_POST['SearchQuery'] ) ) { 
			$search_query = mysql_real_escape_string($_POST['SearchQuery']); 
			$result = mysql_query( "SELECT * FROM products WHERE product_name LIKE '%".$search_query."%' OR description LIKE '%".$search_query."%' OR info LIKE '%".$search_query."%' ORDER BY purchased_recently DESC" ) or die( mysql_error() ); 
		}

		while( $row = mysql_fetch_array( $result, MYSQL_BOTH ) ) 
			GenProductView( $row );
	}
	
	function GenProductView( $product ) {
		echo "<li class='product_card_container' id='product_".$product['product_id']."' onclick='viewProduct(event,\"".$product['product_id']."\");'>";
		echo "<div class='product_card'>";
		echo "<div class='pc_title_container'><div class='pc_title'>".$product['product_name']."</div></div>";
		echo "<div class='pc_info_img_container'>";
		echo "<div class='pc_rating_container'>";
		$blank_stars = 5 - $product['rating'];
		for($stars = 5; $stars > 0; $stars--) {
			if($blank_stars > 0) {
				echo "<div class='blank_star'></div>";
			} else {
				echo "<div class='filled_star'></div>";
			}
			$blank_stars--;
		}
		echo "</div>";
		echo "<img class='pc_img' src='img/".$product['product_image']."' alt='".$product['product_name']."' />";
		echo "<div class='pc_info_container'>";
		echo "<div class='pc_price_container'><div class='pc_price'>$".number_format($product['price'], 2)."</div></div>";
		echo "<div class='pc_info'>";
		$info_item = explode(",", $product['info']);
		foreach($info_item as $info)
			echo $info."<br/>";
		echo "</div></div></div>";
		echo "<div class='pc_desc_container'>";
		echo "<div class='pc_desc'>".$product['description']."</div></div>";
		echo "<div class='pc_footer_container'>";
		echo "<div class='pc_footer_top'></div>";
		echo "<div class='pc_footer'>";
		echo "<div class='pc_to_cart_button' onclick='addToCart(event,".$product['product_id'].");'><img src='img/shopping_cart.png' alt='Add to Cart' /></div>";
		echo "</div></div></div></li>";
	}
		
?>
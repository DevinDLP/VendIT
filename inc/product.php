<?php
	require( "globals.php" );
	
	$product_id = $_POST['ProductID'];

	mysql_connect( $DB_HOST, $DB_USER, $DB_PASS ) or die( mysql_error() );
	mysql_select_db( $DB_NAME ) or die( mysql_error() );
	
	$result = mysql_query( "SELECT * FROM products WHERE product_id = ".$product_id ) or die( mysql_error() );  
	$row = mysql_fetch_array( $result, MYSQL_BOTH );
	
	echo "<div class='product_view_container'>";
	echo "<div class='product_view_title'><h1>".$row['product_name']."</h1></div>";
	echo "<img class='product_view_img' src='img/".$row['product_image']."' alt='".$row['product_name']."' />";
	echo "<div class='product_view_info'>";
	echo "<h2>Price:</h2><h3> $".number_format($row['price'], 2)."</h3><br/>";
	$info_item = explode(",", $row['info']);
	foreach($info_item as $info)
		echo $info."<br/>";
	echo "<div class='featured_product_buy' onclick='addToCart(event,\"".$row['product_id']."\");'><img src='img/shopping_cart.png' alt='Add to Cart' /></div>";
	echo "</div>";
	echo "<div class='product_view_desc'>";
	echo $row['description'];
	echo "</div>";
	echo "</div>";
		
?>
<?php
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *"); 
    include("../service/ordersItem.php");   

    $methods = $_SERVER["REQUEST_METHOD"];

        switch($methods){
           
            case "GET":
                echo getOrdersItem();
                break;
            case "POST":
                $order_code = $_POST["order_code"];
                $product_code = $_POST["product_code"];    
                $amount = $_POST["amount"];    
                $price = $_POST["price"];    
                $tax = $_POST["tax"];    
                echo postOrdersItem($order_code, $product_code ,$amount, $price, $tax);
                break;
            case "DELETE":
                $deleteOrdItem = $_GET["code"];    
                echo deleteOrdersItem($deleteOrdItem);
                break;
      };

?>
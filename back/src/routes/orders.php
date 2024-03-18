<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include("../service/orders.php");   

    $methods = $_SERVER["REQUEST_METHOD"];

        switch($methods){
           
            case "GET":
                echo getOrders();
                break;
            case "POST":
                $code = $_POST["code"];
                $total = $_POST["total"];
                $tax = $_POST["tax"];    
                echo postOrders($code, $total, $tax);
                break;
            case "DELETE":
                $deleteOrd = $_GET["code"];    
                echo deleteOrders($deleteOrd);
                break;
      };

?>
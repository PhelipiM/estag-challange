<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include("../service/products.php");   

    $methods = $_SERVER["REQUEST_METHOD"];

        switch($methods){
           
            case "GET":
                echo getProducts();
                break;
            case "POST":
                $name = $_POST["name"];
                $price = $_POST["price"];    
                $amount = $_POST["amount"];    
                $categoryCode = $_POST["categoryCode"];    
                echo postProducts($name, $price, $amount, $categoryCode);
                break;
            case "DELETE":
                $deletePro = $_GET["code"];
                error_log(print_r($_GET, true));

                echo deleteProducts($deletePro);
                break;
      };

?>
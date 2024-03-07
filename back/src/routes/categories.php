<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Headers: *");
    include("../service/categories.php");   

    $methods = $_SERVER["REQUEST_METHOD"];

        switch($methods){
           
            case "GET":
                echo getCategories();
                break;
            case "POST":
                $name = $_POST["name"];
                $tax = $_POST["tax"];    
                echo postCategories($name, $tax);
                break;
            case "DELETE":
                $deleteCat = $_GET["code"];
                echo deleteCategories($deleteCat);
                break;
      };

?>
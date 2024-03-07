<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include("../index.php");

    function getCategories(){
        
        $getCategories = myPDO->query("SELECT * FROM categories");
        $datacat = $getCategories->fetchALL();
        return json_encode($datacat);
    }   
    function postCategories($name, $tax){

        $postCategories = myPDO->prepare("INSERT INTO categories ( NAME, TAX) VALUES ('{$name}',{$tax})");
        $postCategories->execute();
        return "created";
    }
    function deleteCategories($code){
        $deleteCategories = myPDO->prepare("DELETE FROM CATEGORIES WHERE CODE = {$code}");
        $deleteCategories->execute();
        return "apagado";
    }


?>
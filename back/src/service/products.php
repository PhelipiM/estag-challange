<?php
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include_once("../index.php");

    function getProducts(){

        $getProducts = myPDO->query("SELECT products.*, categories.name as name_category, categories.tax as tax_category FROM products INNER JOIN categories ON products.category_code = categories.code");
        $dataPro = $getProducts->fetchALL();
        return json_encode($dataPro);
    };
    function postProducts($name, $price, $amount, $categoryCode){

        $postProducts = myPDO->prepare("INSERT INTO products ( NAME, PRICE, AMOUNT, CATEGORY_CODE ) VALUES ('{$name}','{$price}','{$amount}','{$categoryCode}')");
        $postProducts->execute();
        return "created";
    };
    function deleteProducts($code){
        $deleteProdutos = myPDO->prepare("DELETE FROM products WHERE CODE = {$code}");
        $deleteProdutos->execute();
        return "apagado";
    };

     function produtoCode($code){
        $getProdutos = myPDO->query("SELECT products.*, categories.name as name_category, categories.tax as tax_category FROM products INNER JOIN categories ON products.category_code = categories.code WHERE PRODUCTS.code = {$code}");
        $data = $getProdutos->fetch();
        return $data;
    };

    function descontarEstoque($code, $amount){
        $produtocode = produtoCode($code);
        $novoEstoque = $produtocode["amount"] - $amount;
        $atualizarEstoque = myPDO->prepare("UPDATE products SET AMOUNT = {$novoEstoque} WHERE CODE = {$code}");
        $atualizarEstoque->execute();
    };
?> 


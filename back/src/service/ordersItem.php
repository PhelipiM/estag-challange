<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include_once("../index.php");
    include_once("../service/products.php");

    function getOrdersItem(){

        $getOrdersItem = myPDO->query("SELECT * FROM ORDER_ITEM");
        $dataOrdItem = $getOrdersItem->fetchALL();
        return json_encode($dataOrdItem);
    };
    function postOrdersItem($order_code, $product_code, $amount, $price, $tax){

        $postOrdersItem = myPDO->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX) VALUES ('{$order_code}',{$product_code},{$amount},{$price},{$tax})");
        $postOrdersItem->execute();
        descontarEstoque($product_code, $amount);
        return "created";
    };
    function deleteOrdersItem($code){
        $deleteOrderItem = myPDO->prepare("DELETE FROM ORDER_ITEM WHERE CODE = {$code}");
        $deleteOrderItem->execute();
        return "apagado";
    };

?>


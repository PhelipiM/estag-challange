<?php 
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, DELETE");
    header("Access-Control-Allow-Origin: *");
    include("../index.php");

    function getOrders(){

        $getOrders = myPDO->query("SELECT * FROM orders");
        $dataOrd = $getOrders->fetchALL();
        return json_encode($dataOrd);
    };
    function postOrders($total, $tax){

        $postOrders = myPDO->prepare("INSERT INTO orders (TOTAL, TAX) VALUES ({$total},{$tax})");
        $postOrders->execute();
        return "created";
    };
    function deleteOrders($code){
        $deleteOrder = myPDO->prepare("DELETE FROM ORDERS WHERE CODE = {$code}");
        $deleteOrder->execute();
        return "apagado";
    };

?>

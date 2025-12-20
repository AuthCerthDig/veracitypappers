<?php
$host = "localhost";
$db   = "validacao";
$user = "usuario_db";
$pass = "senha_db";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "erro"]);
    exit;
}

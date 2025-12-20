<?php
header("Content-Type: application/json");
require "config.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["codigo"])) {
    echo json_encode(["status" => "erro"]);
    exit;
}

$codigo = strtoupper($data["codigo"]);

$stmt = $pdo->prepare("SELECT id FROM documentos WHERE codigo = ? AND status = 'VALIDO'");
$stmt->execute([$codigo]);

if ($stmt->fetch()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "invalido"]);
}

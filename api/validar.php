<?php
header("Content-Type: application/json");

// Caminho para o JSON na raiz do projeto
$arquivo = __DIR__ . "/../documentos.json";

if (!file_exists($arquivo)) {
    echo json_encode(["status" => "erro", "mensagem" => "Base de dados não encontrada"]);
    exit;
}

$dados = json_decode(file_get_contents($arquivo), true);

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["codigo"])) {
    echo json_encode(["status" => "erro", "mensagem" => "Código não informado"]);
    exit;
}

$codigoInformado = strtoupper(trim($input["codigo"]));

foreach ($dados as $doc) {
    if ($doc["codigo"] === $codigoInformado) {
        if ($doc["status"] === "VALIDO") {
            // Retorno personalizado
            $mensagem = "Documento Original Válido! Esse certificado foi verificado e as informações desse documento são para o CFP *99.*1*.30*-32 .";
            
            echo json_encode([
                "status" => "ok",
                "mensagem" => $mensagem,
                "tipo_documento" => $doc["tipo_documento"],
                "data_emissao" => $doc["data_emissao"]
            ]);
        } else {
            echo json_encode(["status" => "invalido"]);
        }
        exit;
    }
}

echo json_encode(["status" => "invalido"]);

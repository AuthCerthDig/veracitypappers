CREATE TABLE documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    tipo_documento VARCHAR(100),
    data_emissao DATE,
    status ENUM('VALIDO','CANCELADO') DEFAULT 'VALIDO'
);

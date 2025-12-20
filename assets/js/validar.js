function validarDocumento() {
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const mensagem = document.getElementById("mensagem");

    const regex = /^[A-Z0-9]{10}$/;

    if (!regex.test(codigo)) {
        mensagem.textContent = "Código inválido. Use 10 caracteres alfanuméricos.";
        mensagem.className = "mensagem erro";
        return;
    }

    fetch("api/validar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ codigo: codigo })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "ok") {
            // Mostra a mensagem personalizada
            mensagem.textContent = data.mensagem;
            mensagem.className = "mensagem sucesso";
        } else {
            mensagem.textContent = "Documento não encontrado ou inválido.";
            mensagem.className = "mensagem erro";
        }
    })
    .catch(() => {
        mensagem.textContent = "Erro ao validar o documento.";
        mensagem.className = "mensagem erro";
    });
}

function validarDocumento() {
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = "";

    if (!/^[A-Z0-9]{10}$/.test(codigo)) {
        mensagem.textContent = "Código inválido. Use 10 caracteres alfanuméricos.";
        mensagem.className = "mensagem erro";
        return;
    }

    fetch("documentos.json")
        .then(res => res.json())
        .then(dados => {
            const doc = dados.find(d => d.codigo === codigo);

            if (doc && doc.status === "VALIDO") {
                mensagem.innerHTML = `
                    <strong>Documento Original Válido!</strong><br><br>
                    Esse certificado foi verificado e as informações desse documento são para o CFP ${doc.cfp}.<br><br>
                    <strong>Tipo:</strong> ${doc.tipo}<br>
                    <strong>Data de Emissão:</strong> ${doc.data}
                `;
                mensagem.className = "mensagem sucesso";
            } else {
                mensagem.textContent = "Documento não encontrado ou inválido.";
                mensagem.className = "mensagem erro";
            }
        })
        .catch(() => {
            mensagem.textContent = "Erro ao acessar os dados de validação.";
            mensagem.className = "mensagem erro";
        });
}

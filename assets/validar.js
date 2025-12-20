function validarDocumento() {
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const mensagem = document.getElementById("mensagem");

    if (!codigo) {
        mensagem.textContent = "Informe o código do documento.";
        mensagem.className = "mensagem erro";
        return;
    }

    fetch("documentos.json")
        .then(res => res.json())
        .then(dados => {
            const doc = dados.find(d => d.codigo === codigo);

            if (doc) {
                mensagem.innerHTML = `
                <strong>Documento Original Válido!</strong><br>
                Esse certificado foi verificado e as informações desse documento são para o CFP ${doc.cfp}.
                `;
                mensagem.className = "mensagem sucesso";
            } else {
                mensagem.textContent = "Documento não encontrado ou inválido.";
                mensagem.className = "mensagem erro";
            }
        })
        .catch(() => {
            mensagem.textContent = "Erro ao acessar base de dados.";
            mensagem.className = "mensagem erro";
        });
}

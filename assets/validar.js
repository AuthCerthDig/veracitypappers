async function validarDocumento() {
    const codigoInput = document.getElementById("codigo");
    const mensagem = document.getElementById("mensagem");

    const codigo = codigoInput.value.trim().toUpperCase();

    mensagem.className = "mensagem";
    mensagem.innerHTML = "";

    if (!codigo || codigo.length !== 10) {
        mensagem.classList.add("erro");
        mensagem.textContent = "Informe um código válido com 10 caracteres.";
        return;
    }

    try {
        // ✅ CAMINHO CORRETO CONFORME SUA ÁRVORE
        const resposta = await fetch("documentos.json", { cache: "no-store" });

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }

        const documentos = await resposta.json();

        const doc = documentos.find(d =>
            String(d.codigo).trim().toUpperCase() === codigo
        );

        if (!doc) {
            mensagem.classList.add("erro");
            mensagem.textContent = "Documento não localizado ou inválido.";
            return;
        }

        if (doc.status !== "VALIDO") {
            mensagem.classList.add("erro");
            mensagem.textContent = "Documento localizado, porém inválido.";
            return;
        }

        mensagem.classList.add("sucesso");
        mensagem.innerHTML = `
            <strong>DOCUMENTO LOCALIZADO COM SUCESSO (ATIVO)</strong><br><br>
            <strong>Instituição Emissora:</strong><br>${doc.instituicao}<br><br>
            <strong>Curso:</strong><br>${doc.curso}<br><br>
            <strong>Tipo do Documento:</strong> ${doc.tipo}<br>
            <strong>Data de Emissão:</strong> ${doc.data}<br>
            <strong>CPF do Titular:</strong> ${doc.cpf}<br>
            <strong>Código de Validação:</strong> ${doc.codigo}
        `;

    } catch (erro) {
        console.error("Erro ao validar:", erro);
        mensagem.classList.add("erro");
        mensagem.textContent = "Erro ao consultar a base de dados.";
    }
}

window.validarDocumento = validarDocumento;

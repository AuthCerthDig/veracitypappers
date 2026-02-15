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

        // ✅ RESULTADO ESTILO INSTITUCIONAL
        mensagem.classList.add("sucesso");
        mensagem.innerHTML = `
            <div class="validacao-box">
                <h2>Certidão de Autenticidade Documental</h2>

                <p>
                    Certificamos, para os devidos fins, que o documento acadêmico
                    abaixo identificado encontra-se devidamente registrado nos
                    arquivos institucionais, estando em plena validade na data
                    desta consulta.
                </p>

                <hr>

                <p><strong>Instituição de Ensino:</strong><br>
                ${doc.instituicao}</p>

                <p><strong>Curso:</strong> ${doc.curso}</p>

                <p><strong>Tipo do Documento:</strong> ${doc.tipo}</p>

                <p><strong>Data de Emissão:</strong> ${doc.data}</p>

                <hr>

                <p><strong>CPF do Titular:</strong> ${doc.cpf}</p>

                <p><strong>Código de Validação:</strong> ${doc.codigo}</p>

                <hr>

                <p class="assinatura">
                    Documento validado eletronicamente em 
                    ${new Date().toLocaleDateString()}.
                </p>
            </div>
        `;

    } catch (erro) {
        console.error("Erro ao validar:", erro);
        mensagem.classList.add("erro");
        mensagem.textContent = "Erro ao consultar a base de dados.";
    }
}

window.validarDocumento = validarDocumento;

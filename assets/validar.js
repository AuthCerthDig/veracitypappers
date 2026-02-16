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

        // ✅ RESULTADO INSTITUCIONAL COMPLETO
        mensagem.classList.add("sucesso");
        mensagem.innerHTML = `
            <div class="validacao-box">

                <h2>Certidão de Autenticidade Documental</h2>

                <p>
                    Certificamos, para os devidos fins, que o(a) Sr.(a) 
                    <strong>${doc.nome_titular}</strong>, inscrito(a) no CPF 
                    ${doc.cpf}, concluiu regularmente o curso abaixo especificado,
                    encontrando-se o respectivo documento devidamente registrado
                    nesta de ensino.
                </p>

                <hr>

                <p><strong>Instituição de Ensino:</strong><br>
                ${doc.instituicao}</p>

                <p><strong>Código MEC:</strong> ${doc.codigo_mec}</p>

                <p><strong>Curso:</strong> ${doc.curso}</p>

                <p><strong>Grau Conferido:</strong> ${doc.grau}</p>

                <p><strong>Modalidade:</strong> ${doc.modalidade}</p>

                <p><strong>Carga Horária Total:</strong> ${doc.carga_horaria}</p>

                <hr>

                <p><strong>Data de Conclusão:</strong> ${doc.data_conclusao}</p>

                <p><strong>Data de Emissão:</strong> ${doc.data_emissao}</p>

                <p><strong>Tipo de Documento:</strong> ${doc.tipo_documento}</p>

                <hr>

                <p><strong>Registro Acadêmico:</strong> ${doc.registro}</p>

                <p><strong>Livro:</strong> ${doc.livro} &nbsp;&nbsp; 
                <strong>Folha:</strong> ${doc.folha}</p>

                <hr>

                <p><strong>Código de Validação:</strong> ${doc.codigo}</p>

               <p class="assinatura">
    Doocumento original microfilmado. Assinatura digital VeracityPappers<sup>®</sup></p>
               <p> Documento validado eletronicamente em ${new Date().toLocaleDateString()}.
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

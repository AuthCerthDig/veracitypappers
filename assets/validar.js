
async function validarDocumento() {
  const codigoInput = document.getElementById("codigo");
  const mensagem = document.getElementById("mensagem");
  const codigo = codigoInput.value.trim().toUpperCase();

  mensagem.className = "mensagem";
  mensagem.innerHTML = "";

  if (!codigo || codigo.length !== 10) {
    mensagem.classList.add("erro");
    mensagem.innerHTML = "Informe um código válido com 10 caracteres.";
    return;
  }

  try {
    const resposta = await fetch("./documentos.json"); // Caminho correto para GitHub Pages
    if (!resposta.ok) {
      throw new Error(`Erro ao carregar documentos.json (HTTP ${resposta.status})`);
    }

    const documentos = await resposta.json();
    const doc = documentos.find(d => (d.codigo || "").trim().toUpperCase() === codigo);

    const statusOk = doc && typeof doc.status === "string" &&
                     ["VALIDO", "VÁLIDO"].includes(doc.status.normalize("NFC").toUpperCase().trim());

    if (statusOk) {
      mensagem.classList.add("sucesso");
      mensagem.innerHTML = `
        <strong>DOCUMENTO LOCALIZADO COM SUCESSO! (ATIVO)</strong><br><br>
        <strong>Instituição Emissora:</strong><br>${doc.instituicao}<br><br>
        <strong>Curso:</strong><br>${doc.curso}<br><br>
        <strong>Tipo do Documento:</strong> ${doc.tipo}<br>
        <strong>Data de Emissão:</strong> ${doc.data}<br>
        <strong>CPF do Titular:</strong> ${doc.cpf}<br>
        <strong>Código de Validação:</strong> ${doc.codigo}
      `;
    } else {
      mensagem.classList.add("erro");
      mensagem.innerHTML = "Documento não localizado ou inválido.";
    }

  } catch (erro) {
    mensagem.classList.add("erro");
    mensagem.innerHTML = "Erro ao consultar a base de dados.";
    console.error(erro);
  }
}

// Expor globalmente
window.validarDocumento = validarDocumento;

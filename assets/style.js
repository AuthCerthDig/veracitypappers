/* Reset básico */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Tahoma, sans-serif;
}

/* Fundo da página */
body {
    min-height: 100vh;
    background: linear-gradient(135deg, #e8e3ff, #f5f7ff);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Card central */
.container {
    background: #ffffff;
    padding: 32px 36px;
    border-radius: 18px;
    width: 100%;
    max-width: 460px;
    text-align: center;
    box-shadow: 0 18px 45px rgba(120, 120, 180, 0.25);
}

/* Título */
.container h1 {
    color: #2c2f6c;
    margin-bottom: 12px;
}

/* Texto introdutório */
.container p {
    color: #555;
    font-size: 15px;
    margin-bottom: 20px;
}

/* Campo de código */
input#codigo {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #cfcfff;
    text-align: center;
    letter-spacing: 2px;
    margin-bottom: 18px;
    outline: none;
    transition: border 0.3s, box-shadow 0.3s;
}

input#codigo:focus {
    border-color: #9f8cff;
    box-shadow: 0 0 0 3px rgba(159, 140, 255, 0.2);
}

/* Botão */
button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #9f8cff, #b59cff);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(159, 140, 255, 0.4);
}

/* Mensagens */
.mensagem {
    margin-top: 22px;
    font-size: 15px;
    line-height: 1.6;
}

/* Sucesso */
.mensagem.sucesso {
    color: #1e7e34;
    background: #e6f7ec;
    border-radius: 10px;
    padding: 14px;
    margin-top: 22px;
}

/* Erro */
.mensagem.erro {
    color: #b00020;
    background: #fde8eb;
    border-radius: 10px;
    padding: 14px;
    margin-top: 22px;
}

/* Info QR */
.qr-info {
    margin-top: 22px;
    font-size: 13px;
    color: #666;
}

let saldoAtual = 0;
let vitorias = 0;
let derrotas = 0;
let meta = 0; // A variável meta agora será utilizada corretamente.

document.getElementById("lockButton").addEventListener("click", function() {
    const saldoInicial = parseFloat(document.getElementById("saldoInicial").value);
    meta = parseFloat(document.getElementById("meta").value); // Atribuir o valor da meta corretamente
    const entrada = parseFloat(document.getElementById("entrada").value);
    const porcentagem = parseFloat(document.getElementById("porcentagem").value);
    const stopLoss = parseFloat(document.getElementById("stopLoss").value);

    if (isNaN(saldoInicial) || isNaN(meta) || isNaN(entrada) || isNaN(porcentagem) || isNaN(stopLoss)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    saldoAtual = saldoInicial;
    document.getElementById("saldoAtualValue").textContent = `$${saldoAtual.toFixed(2)}`;

    document.getElementById("lockButton").disabled = true;
    document.getElementById("alertMessage").classList.add("d-none");
});

document.getElementById("winButton").addEventListener("click", function() {
    const entrada = parseFloat(document.getElementById("entrada").value);
    const porcentagem = parseFloat(document.getElementById("porcentagem").value);
    
    saldoAtual += (entrada * (porcentagem / 100));
    vitorias++;
    updateSaldo();
    updateVitoriaCount();

    // Verificar se a meta foi alcançada (Saldo Atual + Meta)
    if (saldoAtual >= (parseFloat(document.getElementById("saldoInicial").value) + meta)) {
        showAlert("Meta alcançada!", "success");
    }
});

document.getElementById("lossButton").addEventListener("click", function() {
    const entrada = parseFloat(document.getElementById("entrada").value);
    
    saldoAtual -= entrada;
    derrotas++;
    updateSaldo();
    updateDerrotaCount();

    // Verificar se o Stop Loss foi alcançado (Saldo Atual - Meta)
    if (saldoAtual <= (parseFloat(document.getElementById("saldoInicial").value) - meta)) {
        showAlert("Stop Loss alcançado!", "danger");
    }
});

function updateSaldo() {
    document.getElementById("saldoAtualValue").textContent = `$${saldoAtual.toFixed(2)}`;
}

function updateVitoriaCount() {
    document.getElementById("vitoriaCount").querySelector("span").textContent = vitorias;
}

function updateDerrotaCount() {
    document.getElementById("derrotaCount").querySelector("span").textContent = derrotas;
}

function showAlert(message, type) {
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertMessage.classList.remove("d-none", "alert-success", "alert-danger");
    alertMessage.classList.add(`alert-${type}`);
}

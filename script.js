document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const btnLimpar = document.getElementById('btnLimpar');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userName = document.getElementById('userName').value;
            const clienteInput = document.getElementById('cliente');
            if (clienteInput) {
                clienteInput.value = userName;
            }
            if (loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    const form = document.getElementById('freteForm');
    const resultBox = document.getElementById('resultado');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emitente = document.getElementById('emitente').value;
            const cliente = document.getElementById('cliente').value;
            const origem = document.getElementById('origem').value;
            const destino = document.getElementById('destino').value;
            const mercadoria = document.getElementById('mercadoria').value;
            
            const valorNF = parseFloat(document.getElementById('valorNF').value) || 0;
            const comprimento = parseFloat(document.getElementById('comprimento').value) || 0;
            const largura = parseFloat(document.getElementById('largura').value) || 0;
            const altura = parseFloat(document.getElementById('altura').value) || 0;
            const qtdVolumes = parseInt(document.getElementById('qtdVolumes').value, 10) || 1;
            const pesoReal = parseFloat(document.getElementById('pesoReal').value) || 0;
            
            const tarifaKg = parseFloat(document.getElementById('tarifaKg').value) || 0;
            const freteMinimo = parseFloat(document.getElementById('freteMinimo').value) || 0;
            const pctAdValorem = parseFloat(document.getElementById('adValorem').value) || 0;
            const pctGris = parseFloat(document.getElementById('gris').value) || 0;
            const pedagio = parseFloat(document.getElementById('pedagio').value) || 0;

            const volumeM3 = ((comprimento / 100) * (largura / 100) * (altura / 100)) * qtdVolumes;
            const pesoCubado = volumeM3 * 300;
            const pesoTaxavel = Math.max(pesoReal, pesoCubado);

            let fretePesoCalculado = pesoTaxavel * tarifaKg;
            const usouFreteMinimo = fretePesoCalculado < freteMinimo;
            const fretePesoFinal = usouFreteMinimo ? freteMinimo : fretePesoCalculado;

            const vlrAdValorem = (valorNF * pctAdValorem) / 100;
            const vlrGris = (valorNF * pctGris) / 100;
            const totalFreteBruto = fretePesoFinal + vlrAdValorem + vlrGris + pedagio;

            const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            if (resultBox) {
                resultBox.innerHTML = `
                    <h2>Memória de Cálculo de Frete</h2>
                    <div class="res-info">
                        <p><strong>Emitente:</strong> ${emitente}</p>
                        <p><strong>Cliente:</strong> ${cliente} | <strong>Carga:</strong> ${mercadoria}</p>
                        <p><strong>Rota:</strong> ${origem} &rarr; ${destino}</p>
                        <p><strong>Valor NF:</strong> ${fmt(valorNF)}</p>
                        <p><strong>Cubagem:</strong> ${volumeM3.toFixed(3)} m³ | <strong>Peso Taxável:</strong> ${pesoTaxavel.toFixed(2)} kg (${pesoReal >= pesoCubado ? 'Real' : 'Cubado'})</p>
                    </div>
                    <hr style="border: 0; border-top: 1px solid #484C51; margin: 12px 0;">
                    <div class="res-row">
                        <span>Frete Peso:</span>
                        <span>${fmt(fretePesoFinal)} ${usouFreteMinimo ? '(Mínimo)' : ''}</span>
                    </div>
                    <div class="res-row">
                        <span>Ad Valorem:</span>
                        <span>${fmt(vlrAdValorem)}</span>
                    </div>
                    <div class="res-row">
                        <span>GRIS:</span>
                        <span>${fmt(vlrGris)}</span>
                    </div>
                    <div class="res-row">
                        <span>Pedágio:</span>
                        <span>${fmt(pedagio)}</span>
                    </div>
                    <div class="res-row highlight">
                        <span>TOTAL:</span>
                        <span>${fmt(totalFreteBruto)}</span>
                    </div>
                `;

                resultBox.classList.add('active');
                resultBox.style.display = 'block';
                resultBox.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            if (form) form.reset();
            if (resultBox) {
                resultBox.classList.remove('active');
                resultBox.style.display = 'none';
                resultBox.innerHTML = '';
            }
        });
    }
});

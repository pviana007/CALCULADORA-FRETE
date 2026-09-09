function calcularFrete() {
    var resultBox = document.getElementById('resultado');

    var getVal = function(id) {
        var el = document.getElementById(id);
        return el ? parseFloat(el.value) || 0 : 0;
    };

    var getTxt = function(id) {
        var el = document.getElementById(id);
        return el ? el.value : '';
    };

    var cliente = getTxt('cliente');
    var origem = getTxt('origem');
    var destino = getTxt('destino');
    var mercadoria = getTxt('mercadoria');

    var valorNF = getVal('valorNF');
    var comprimento = getVal('comprimento');
    var largura = getVal('largura');
    var altura = getVal('altura');
    var qtdVolumes = getVal('quantidade') || 1;
    var pesoReal = getVal('pesoReal');

    var tarifaKg = getVal('tarifa');
    var freteMinimo = getVal('freteMinimo');
    var pctAdValorem = getVal('adValorem');
    var pctGris = getVal('gris');
    var pedagio = getVal('pedagio');

    var volumeM3 = ((comprimento / 100) * (largura / 100) * (altura / 100)) * qtdVolumes;
    var pesoCubado = volumeM3 * 300;
    var pesoTaxavel = Math.max(pesoReal, pesoCubado);

    var fretePesoCalculado = pesoTaxavel * tarifaKg;
    var usouFreteMinimo = fretePesoCalculado < freteMinimo;
    var fretePesoFinal = usouFreteMinimo ? freteMinimo : fretePesoCalculado;

    var vlrAdValorem = (valorNF * pctAdValorem) / 100;
    var vlrGris = (valorNF * pctGris) / 100;
    var totalFreteBruto = fretePesoFinal + vlrAdValorem + vlrGris + pedagio;

    var fmt = function(v) {
        return 'R$ ' + v.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.');
    };

    resultBox.innerHTML = 
        '<h2>Memória de Cálculo de Frete</h2>' +
        '<div class="res-info">' +
            '<p><strong>Cliente:</strong> ' + cliente + ' | <strong>Carga:</strong> ' + mercadoria + '</p>' +
            '<p><strong>Rota:</strong> ' + origem + ' &rarr; ' + destino + '</p>' +
            '<p><strong>Valor NF:</strong> ' + fmt(valorNF) + '</p>' +
            '<p><strong>Cubagem:</strong> ' + volumeM3.toFixed(3) + ' m³ | <strong>Peso Taxável:</strong> ' + pesoTaxavel.toFixed(2) + ' kg</p>' +
        '</div>' +
        '<hr style="border: 0; border-top: 1px solid #484C51; margin: 12px 0;">' +
        '<div class="res-row"><span>Frete Peso:</span><span>' + fmt(fretePesoFinal) + (usouFreteMinimo ? ' (Mínimo)' : '') + '</span></div>' +
        '<div class="res-row"><span>Ad Valorem:</span><span>' + fmt(vlrAdValorem) + '</span></div>' +
        '<div class="res-row"><span>GRIS:</span><span>' + fmt(vlrGris) + '</span></div>' +
        '<div class="res-row"><span>Pedágio:</span><span>' + fmt(pedagio) + '</span></div>' +
        '<div class="res-row highlight"><span>TOTAL:</span><span>' + fmt(totalFreteBruto) + '</span></div>';

    resultBox.className = 'result-box active';
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

function limparFormulario() {
    var form = document.getElementById('calcForm');
    if (form) form.reset();
    var resultBox = document.getElementById('resultado');
    if (resultBox) {
        resultBox.className = 'result-box';
        resultBox.style.display = 'none';
        resultBox.innerHTML = '';
    }
}
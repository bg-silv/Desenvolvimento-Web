var altura = document.getElementById('altura-imc');
var peso = document.getElementById('peso-imc');

function formulaImc() {
    var alturaValor = parseFloat(altura.value)
    var pesoValor = parseFloat(peso.value)
    var IMC = pesoValor / (alturaValor * alturaValor)
    alert(IMC)
}


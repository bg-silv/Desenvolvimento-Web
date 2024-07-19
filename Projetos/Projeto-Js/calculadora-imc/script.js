// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];
  
  // Seleção de elementos
  const imcTable = document.querySelector("#imc-table");  // Seleciona a tabela de IMC no DOM
  
  const heightInput = document.querySelector("#height");  // Seleciona o campo de entrada da altura
  const weightInput = document.querySelector("#weight");  // Seleciona o campo de entrada do peso
  const calcBtn = document.querySelector("#calc-btn");  // Seleciona o botão de calcular
  const clearBtn = document.querySelector("#clear-btn");  // Seleciona o botão de limpar
  
  const calcContainer = document.querySelector("#calc-container");  // Seleciona o contêiner de cálculo
  const resultContainer = document.querySelector("#result-container");  // Seleciona o contêiner de resultado
  
  const imcNumber = document.querySelector("#imc-number span");  // Seleciona o elemento de exibição do número do IMC
  const imcInfo = document.querySelector("#imc-info span");  // Seleciona o elemento de exibição da informação do IMC
  
  const backBtn = document.querySelector("#back-btn");  // Seleciona o botão de voltar
  
  // Funções
  function createTable(data) {
    data.forEach((item) => {
      const div = document.createElement("div");  // Cria um novo elemento div
      div.classList.add("table-data");  // Adiciona a classe 'table-data' ao div
  
      const classification = document.createElement("p");  // Cria um novo elemento p para a classificação
      classification.innerText = item.classification;  // Define o texto do p como a classificação
  
      const info = document.createElement("p");  // Cria um novo elemento p para a informação
      info.innerText = item.info;  // Define o texto do p como a informação
  
      const obesity = document.createElement("p");  // Cria um novo elemento p para a obesidade
      obesity.innerText = item.obesity;  // Define o texto do p como o grau de obesidade
  
      div.appendChild(classification);  // Adiciona o p de classificação ao div
      div.appendChild(info);  // Adiciona o p de informação ao div
      div.appendChild(obesity);  // Adiciona o p de obesidade ao div
  
      imcTable.appendChild(div);  // Adiciona o div à tabela de IMC
    });
  }
  
  function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");  // Remove todos os caracteres que não são dígitos ou vírgulas
  }
  
  function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);  // Calcula o IMC e arredonda para uma casa decimal
    return imc;  // Retorna o valor do IMC
  }
  
  function cleanInputs() {
    heightInput.value = "";  // Limpa o campo de entrada da altura
    weightInput.value = "";  // Limpa o campo de entrada do peso
    imcNumber.className = "";  // Remove todas as classes do número do IMC
    imcInfo.className = "";  // Remove todas as classes da informação do IMC
  }
  
  function showOrHideResults() {
    calcContainer.classList.toggle("hide");  // Alterna a classe 'hide' no contêiner de cálculo
    resultContainer.classList.toggle("hide");  // Alterna a classe 'hide' no contêiner de resultado
  }
  
  // Init
  createTable(data);  // Inicializa a tabela de IMC com os dados fornecidos
  
  // Eventos
  [heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);  // Valida os dígitos da entrada
  
      e.target.value = updatedValue;  // Atualiza o valor da entrada
    });
  });
  
  calcBtn.addEventListener("click", (e) => {
    e.preventDefault();  // Previne o comportamento padrão do botão
  
    const weight = +weightInput.value.replace(",", ".");  // Converte o valor do peso para um número
    const height = +heightInput.value.replace(",", ".");  // Converte o valor da altura para um número
  
    console.log(weight, height);  // Loga os valores de peso e altura no console
  
    if (!weight || !height) return;  // Verifica se os valores de peso e altura são válidos
  
    const imc = calcImc(height, weight);  // Calcula o IMC
    let info;
  
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;  // Encontra a informação correspondente ao IMC calculado
      }
    });
  
    if (!info) return;  // Verifica se a informação foi encontrada
  
    imcNumber.innerText = imc;  // Atualiza o texto do número do IMC
    imcInfo.innerText = info;  // Atualiza o texto da informação do IMC
  
    // Aplica classes CSS com base na informação do IMC
    switch (info) {
      case "Magreza":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Normal":
        imcNumber.classList.add("good");
        imcInfo.classList.add("good");
        break;
      case "Sobrepeso":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Obesidade":
        imcNumber.classList.add("medium");
        imcInfo.classList.add("medium");
        break;
      case "Obesidade grave":
        imcNumber.classList.add("high");
        imcInfo.classList.add("high");
        break;
    }
  
    showOrHideResults();  // Alterna a visibilidade dos contêineres de cálculo e resultado
  });
  
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();  // Previne o comportamento padrão do botão
  
    cleanInputs();  // Limpa os campos de entrada
  });
  
  backBtn.addEventListener("click", (e) => {
    cleanInputs();  // Limpa os campos de entrada
    showOrHideResults();  // Alterna a visibilidade dos contêineres de cálculo e resultado
  });
  
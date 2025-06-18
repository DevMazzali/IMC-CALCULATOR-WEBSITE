const { createElement } = require("react");

function global() {
  const form = document.querySelector("#formulario");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // nega a atualização do formulário

    const inputPeso = e.target.querySelector("#peso"); // pega as informações de peso que vão ser inseridas, por meio do ID que foi criado no formulario em index.html
    const inputAltura = e.target.querySelector("#altura"); // pega as informações de altura que vão ser inseridas, por meio do ID que foi criado no formulario em index.html

    // Transforma os valores que chegarem em numeros
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value / 100);

    // Se o peso for um texto ou estiver com o campo vazio ele dara erro e aparecera essa mensagem
    if (!peso) {
      setResultado("Peso inválido", false);
      return;
    }

    // Se a altura for um texto ou estiver com o campo vazio ele dara erro e aparecera essa mensagem
    if (!altura) {
      setResultado("Peso inválido", false);
      return;
    }

    const imc = getIMC(peso, altura);
    const nivelIMC = nivelIMC(imc);

    const msg = `Seu IMC é ${imc} (${nivelIMC}).`;

    setResultado(msg, true);
  });

  // Function que irá calcular o IMC do usuário
  function getIMC() {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
  }

  //Function para saber o nivel do IMC corporal do usuário e exibilo de acordo com IMC calculado anteriormente
  function nivelIMC(imc) {
    const nivel = [
      "Abaixo do peso",
      "Peso Normal",
      "Sobrepeso",
      "Obesidade grau 1",
      "Obesidade grau 2",
      "Obesidade grau 3",
    ];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
  }

  // Função para criar elementos
  function criaG() {
    const g = document.createElement("g");
    return g;
  }

  // Function para altera o resultado que aparece na tela do usuario
  function setResultado() {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = " ";

    const g = criaG();

    // Se for valido cria o paragrafo de resultado se for invalido cria uma mensagem de incorreta
    if (isValid) {
      g.classList.add("paragrafo-resultado");
    } else {
      g.classList.add("incorrect")
    }
    g.innerHTML = msg;
    resultado.appendChild(g);
  }
}

global ();

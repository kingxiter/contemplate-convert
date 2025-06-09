//Cotação de dmoedas do dia;
const USD = 5.58;
const EUR = 6.1;
const GBP = 7.1;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input para receber somente numeros.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};
// função para converter a moeda.

function convertCurrency(amount, price, symbol) {
  try {
    // exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // calcula o total da conversão.
    let total = amount * price;

    if(isNaN(total)){ 
      return alert("Por favor, insira um valor válido.");
    }

    total = formatCurrencyBRL(total).replace("R$", "");

    // Exibe o resultado da conversão.
    result.textContent = `${total} Reais`;

    // aplica a classe que exube o footer para mostrar o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);

    //Remove a classe que exibe o footer em caso de erro.
    footer.classList.remove("show-result");
    alert("Erro ao converter a moeda. Tente novamente mais tarde.");
  }
}
// Formata o valor para o padrão de moeda brasileiro (BRL).
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

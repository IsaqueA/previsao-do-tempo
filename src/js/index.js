const chaveDaApi = "536e2b68801a444eb7f22207242802";

const botaoDeBusca = document.querySelector(".btn-busca");
const inputBusca = document.querySelector("#input-busca");

botaoDeBusca.addEventListener("click", async () => {
    await buscarEExibirDados();
})

inputBusca.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        await buscarEExibirDados();
    }
})

async function buscarEExibirDados(){
  const cidade = document.getElementById("input-busca").value;

  if (!cidade) return;

  const dados = await buscarDadosDaCidade(cidade);

  if (dados) preencherDadosNaTela(dados, cidade);
};

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);

  if (resposta.status !== 200) return;

  const dados = resposta.json();

  return dados;
}

function preencherDadosNaTela(dados, cidade) {
  const temperatura = dados.current.temp_c;
  const nomeCidade = dados.location.name;
  const condicao = dados.current.condition.text;
  const humidade = dados.current.humidity;
  const velocidadeDoVento = dados.current.wind_kph;
  const condicaoIcone = dados.current.condition.icon;

  document.getElementById("cidade").textContent = nomeCidade;

  document.getElementById("temperatura").textContent = `${temperatura} ºC`;

  document.getElementById("condicao").textContent = condicao;

  document.getElementById("humidade").textContent = `${humidade}%`;

  document.getElementById(
    "velocidade-do-vento"
  ).textContent = `${velocidadeDoVento} km/h`;

  document.getElementById("icone-condicao").setAttribute("src", condicaoIcone);
}

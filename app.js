var numContas = 0;
var valorTotal = 0;
var resposta = "";
let contas = [];
let footerValues = [];

const registrar = () => {
  let descricao = document.getElementById("descricao").value;
  let valor = Number(document.getElementById("valor").value);
  if (descricao !== "") {
    if (!isNaN(valor) && valor > 0) {
      contas = [];
      footerValues = [];
      numContas++;
      valorTotal += valor;
      resposta = resposta + descricao + " - R$: " + valor.toFixed(2) + "<br/>";

      contas = [
        {
          descricao,
          valor,
          resposta,
          contas: numContas,
          valorTotal,
        },
      ];
      if (localStorage.getItem("contas") !== null) {
        let listaContas = JSON.parse(localStorage.getItem("contas"));
        listaContas.push({
          descricao,
          valor,
          resposta,
          contas: numContas,
          valorTotal,
        });
        localStorage.setItem("contas", JSON.stringify(listaContas));
      } else {
        localStorage.setItem("contas", JSON.stringify(contas));
      }
      resposta = "";
      document.getElementById("descricao").value = "";
      document.getElementById("valor").value = 0;
      document.getElementById("descricao").focus();
    } else {
      alert("Informe um valor válido");
    }
  } else {
    alert("Informe uma descrição");
  }
};

const listaDeContas = () => {
  const listaContas = JSON.parse(localStorage.getItem("contas"));
  let html = `<div class="card mt-4">
  <div class="card-body">`;
  let payload = {};
  for (let i = 0; i < listaContas.length; i++) {
    payload = {
      contas: listaContas[listaContas.length - 1].contas,
      total: listaContas[listaContas.length - 1].valorTotal,
    };
    html += `<p>${listaContas[i].resposta} </p>`;
  }
  html += `</div>
   <div class="card-footer">`;
  html += ` ${payload.contas} Conta(s) - Total R$: ${payload.total.toFixed(2)}`;

  html += `</div></div>`;

  document.getElementById("output").innerHTML = html;
};

let btnRegistrar = document.getElementById("btnRegistrar");
let btnLista = document.getElementById("btnLista");
btnRegistrar.addEventListener("click", registrar);

btnLista.addEventListener("click", listaDeContas);

function localizar() {
  document.getElementById("resultado").innerHTML = ""; //limpar

  let cep = document.getElementById("cep");

  if (cep.value > 99999999 || cep.value < 9999999) {
    alert(`Por favor, verifique o CEP informado!\nDeve conter 8 (oito) dígitos e não pode conter traços ou pontos.`);
  } else {
    const resquisicao = new XMLHttpRequest(); //criar

    resquisicao.open("GET", "https://viacep.com.br/ws/" + cep.value + "/json/"); //abrir e pegar os dados
    resquisicao.send(); //enviar solicitação

    resquisicao.onload = function() {
      //document.getElementById('resultado').innerHTML = this.responseText; // mostra em JSON

      let dados = JSON.parse(this.responseText); //convertendo texto para objeto
      let log = dados.logradouro;
      let comp = dados.complemento;
      let bai = dados.bairro;
      let cid = dados.localidade;
      let est = dados.uf;
      let ddd = dados.ddd;

      //preparando o retorno para a tela
      const informacoes = [log, comp, bai, cid, est, ddd];
      const rotulo = [
                "Logradouro:",
                "Complemento:",
                "Bairro:",
                "Cidade:",
                "Estado:",
                "DDD:"
            ];
      let cont = 0;

      for (i of informacoes) {
        if (i == undefined) {
          document.getElementById("resultado").innerHTML =
            "CEP não encontrado!";
        } else if (i != "") {
          document.getElementById(
            "resultado"
          ).innerHTML += `<p>${rotulo[cont]} ${i}</p>`;
        }
        cont++;
      }
    };
  }
}

//implementando a opção de usar o 'ENTER'
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    localizar();
  }
});
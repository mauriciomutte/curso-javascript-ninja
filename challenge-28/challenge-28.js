/*
No HTML:
- Crie um formulário com um input de texto que receberá um CEP e um botão
de submit;
- Crie uma estrutura HTML para receber informações de endereço:
"Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
preenchidas com os dados da requisição feita no JS.
- Crie uma área que receberá mensagens com o status da requisição:
"Carregando, sucesso ou erro."

No JS:
- O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
deve ser limpo e enviado somente os números para a requisição abaixo;
- Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
"https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
no input criado no HTML;
- Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
com os dados recebidos.
- Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
a mensagem: "Buscando informações para o CEP [CEP]..."
- Se não houver dados para o CEP entrado, mostrar a mensagem:
"Não encontramos o endereço para o CEP [CEP]."
- Se houver endereço para o CEP digitado, mostre a mensagem:
"Endereço referente ao CEP [CEP]:"
- Utilize a lib DOM criada anteriormente para facilitar a manipulação e
adicionar as informações em tela.
*/

(function() {
  'use strict';

  const input = document.getElementById('input');
  const submit = document.getElementById('submit');
  const rua = document.getElementById('logradouro');
  const bairro = document.getElementById('bairro');
  const estado = document.getElementById('estado');
  const cidade = document.getElementById('cidade');
  const cepItem = document.getElementById('CEP');

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    findCepInVIACepAPI(input)
  });

  function findCepInVIACepAPI(cep) {
    const cepValue = cep.replace(/\D/g, '');
    const apiLink = 'https://viacep.com.br/ws/' + cepValue + '/json/';

    getAjax(apiLink);
  }

  function getAjax(link) {
    const request = new XMLHttpRequest();
    request.open('GET', link);
    request.onload = function () {
      const address = JSON.parse(this.responseText);

      rua.value = address.logradouro;
      bairro.value = address.bairro;
      cidade.value = address.localidade;
      estado.value = address.uf;
      cepItem.value = address.cep;
    };
    request.send();
  }
})();

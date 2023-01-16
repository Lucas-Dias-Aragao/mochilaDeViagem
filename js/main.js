const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []; //getItem pega os dados salvos no localStorage

//Os dados serão mantidos assim que a página for recarregada
itens.forEach((elemento) => {
  criaElemento(elemento);
});


// evento de interação
form.addEventListener("submit", (evento)=>{
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];
  const existe = itens.find( elemento => elemento.nome === nome.value);

  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

//atualizando dados de um item da lista
  if(existe){
    itemAtual.id = existe.id;
    
    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

  }else{
    //if ternario
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }
  

  //inserindo dados ao local Storage
  localStorage.setItem("itens", JSON.stringify(itens));
  

  nome.value = "";
  quantidade.value = "";


});



function criaElemento(item){

  const novoItem = document.createElement('li');
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem);

  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
  
}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}


//Função para criar botão com evento de click nos itens, e retornar os itens clicados

function botaoDeleta(id){
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = 'X';

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id){
  tag.remove()

  //removendo item do array
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
  
  //inserindo alteração no localStorage
  localStorage.setItem("itens", JSON.stringify(itens));

}












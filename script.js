const inputCriar = document.getElementById('texto-tarefa');
const buttonCriar = document.getElementById('criar-tarefa');
const listaTarefasCriar = document.getElementById('lista-tarefas');
const apagarTarefas = document.getElementById('apaga-tudo');
const apagarFinalizados = document.getElementById('remover-finalizados');
const salvarLista = document.getElementById('salvar-tarefas');
const removerSelecionado = document.getElementById('remover-selecionado');

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/from
function addTarefaClick(event) {
  const listas = document.querySelectorAll('.item-lista-click');
  const arrayLista = Array.from(listas);
  arrayLista.forEach((e) => {
    e.classList.remove('item-lista-click');
  });
  const lista = event.target;
  lista.classList.add('item-lista-click');
}

function completedTarefa(e) {
  if (e.target.classList.contains('completed')) {
    e.target.classList.remove('completed');
  } else {
    e.target.classList.add('completed');
  }
}

function addTarefa() {
  const inputCriarTexto = inputCriar.value;
  if (inputCriarTexto === '') {
    return;
  }
  const itemTarefa = document.createElement('li');
  itemTarefa.innerText = inputCriarTexto;
  listaTarefasCriar.appendChild(itemTarefa);
  inputCriar.value = null;
  itemTarefa.addEventListener('click', addTarefaClick);

  // https://pt.stackoverflow.com/questions/9605/detectar-se-um-elemento-cont%C3%A9m-uma-classe-com-javascript-puro

  itemTarefa.addEventListener('dblclick', completedTarefa);
}

function apagarItens() {
  const listaToRemove = listaTarefasCriar.children;
  const arrayListaRemove = Array.from(listaToRemove);
  arrayListaRemove.forEach((e) => {
    e.remove();
  });
  localStorage.clear();
}

function apagarItemFinalizado() {
  const listaFinalizados = document.querySelectorAll('.completed');
  const arrayListaFinalizados = Array.from(listaFinalizados);
  arrayListaFinalizados.forEach((e) => {
    e.remove();
  });
}

// https://github.com/tryber/sd-019-a-project-todo-list/blob/raphael-martins-todo-list-project/script.js
function salvarItens() {
  localStorage.clear();
  const listaCompleta = listaTarefasCriar.children;
  for (let i = 0; i < listaCompleta.length; i++) {
    localStorage.setItem(`${i + 1}`, `${listaCompleta[i].innerHTML}`);
    localStorage.setItem(`${i + 1} className`, `${listaCompleta[i].className}`);
  }
}

function loadSavedTasks() {
  for (let i = 0; i < (localStorage.length / 2); i += 1) {
    const newTask = document.createElement('li');
    newTask.innerHTML = localStorage.getItem(`${i + 1}`);
    newTask.className = localStorage.getItem(`${i + 1} className`);
    newTask.addEventListener('click', addTarefa);
    newTask.addEventListener('dblclick', completedTarefa);
    listaTarefasCriar.appendChild(newTask);
  }
}

function removerItemSelecionado() {
  const itemSelecionado = document.querySelector('.item-lista-click');
  if (itemSelecionado) {
    listaTarefasCriar.removeChild(itemSelecionado);
  }
}

removerSelecionado.addEventListener('click', removerItemSelecionado);
salvarLista.addEventListener('click', salvarItens);
apagarFinalizados.addEventListener('click', apagarItemFinalizado);
apagarTarefas.addEventListener('click', apagarItens);
buttonCriar.addEventListener('click', addTarefa);

function onLoadPage() {
  if (localStorage.length !== 0) {
    loadSavedTasks();
  }
}

window.onload = onLoadPage;

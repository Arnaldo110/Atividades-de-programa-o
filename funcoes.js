function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function readTarefa() {
    return JSON.parse(localStorage.getItem('bdTarefa')) ?? [];
}

function setItem(bdTarefa) {
    localStorage.setItem('bdTarefa', JSON.stringify(bdTarefa));
}

function criarTarefa(tarefa) {
    const bdTarefa = readTarefa();
    bdTarefa.push(tarefa);
    setItem(bdTarefa);
    renderizarTarefas();
}

function atualizarTarefa(index, tarefa) {
    const bdTarefa = readTarefa();
    bdTarefa[index] = tarefa;
    setItem(bdTarefa);
    renderizarTarefas();
}

function deletarTarefa(index) {
    const bdTarefa = readTarefa();
    bdTarefa.splice(index, 1);
    setItem(bdTarefa);
    renderizarTarefas();
}

function renderizarTarefas() {
    const tarefas = readTarefa();
    const lista = document.getElementById('listaTarefa');

    lista.innerHTML = tarefas.map((tarefa, index) => `
        <tr>
            <td>${tarefa.titulo}</td>
            <td>${tarefa.descricao}</td>
            <td class="button-container">
                <button onclick="editarTarefa(${index})">Editar</button>
                <button onclick="excluirTarefa(${index})">Excluir</button>
            </td>
        </tr>
    `).join('');
}

function editarTarefa(index) {
    const tarefa = readTarefa()[index];
    document.getElementById('titulo').value = tarefa.titulo;
    document.getElementById('descricao').value = tarefa.descricao;
    document.getElementById('salvarTarefa').dataset.index = index;
    document.getElementById('modalTitle').textContent = "Editar Tarefa";
    openModal();
}

document.getElementById('cadastrarTarefa').addEventListener('click', () => {
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('salvarTarefa').dataset.index = '';
    document.getElementById('modalTitle').textContent = "Nova Tarefa";
    openModal();
});

document.getElementById('salvarTarefa').addEventListener('click', () => {
    const tarefa = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };

    const index = document.getElementById('salvarTarefa').dataset.index;
    
    if (index === '') {
        criarTarefa(tarefa);
    } else {
        atualizarTarefa(index, tarefa);
    }

    closeModal();
});

document.getElementById('fecharModal').addEventListener('click', closeModal);

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if(event.target === modal){
        closeModal();
    }
};

function excluirTarefa(index){

    if (confirm('Você tem certeza que deseja excluir esta tarefa?')){
        deletarTarefa(index);
    }
}

document.getElementById('closeModalIcon').addEventListener('click', closeModal);
document.getElementById('closeModalButton').addEventListener('click', closeModal);

renderizarTarefas();
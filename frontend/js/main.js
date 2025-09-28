const formTarefa = document.getElementById('form-tarefa');
const tarefaInput = document.getElementById('tarefa-input');
const listaTarefas = document.getElementById('lista-tarefas');

const API_URL = 'http://localhost:8080/tarefas';

// Função para buscar tarefas do backend
async function carregarTarefas() {
    listaTarefas.innerHTML = '';
    try {
        const res = await fetch(API_URL);
        const tarefas = await res.json();
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');

            // Texto da tarefa
            const span = document.createElement('span');
            span.textContent = tarefa.titulo;
            if (tarefa.status === 'CONCLUIDA') {
                span.style.textDecoration = 'line-through'; // risca texto se concluída
            }

            // Botão de status
            const btnStatus = document.createElement('button');
            if (tarefa.status === 'CONCLUIDA') {
                btnStatus.textContent = 'DESFAZER';
                btnStatus.style.backgroundColor = 'red';
                btnStatus.style.color = 'white';
            } else {
                btnStatus.textContent = 'FEITO';
                btnStatus.style.backgroundColor = 'green';
                btnStatus.style.color = 'white'
            }

            btnStatus.onclick = () => {
                atualizarTarefa(tarefa.id, {
                    id: tarefa.id,
                    titulo: tarefa.titulo,
                    descricao: tarefa.descricao,
                    status: tarefa.status === 'PENDENTE' ? 'CONCLUIDA' : 'PENDENTE'
                });
            };

            // Botão de excluir
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirTarefa(tarefa.id);

            // Monta li
            li.appendChild(span);
            li.appendChild(btnStatus);
            li.appendChild(btnExcluir);
            listaTarefas.appendChild(li);

        });
    } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
    }
}

// Função para adicionar tarefa
formTarefa.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = tarefaInput.value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ titulo })
        });
        tarefaInput.value = '';
        carregarTarefas();
    } catch (err) {
        console.error('Erro ao adicionar tarefa:', err);
    }
});

// Função para excluir tarefa
async function excluirTarefa(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarTarefas();
    } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
    }
}

//Função para atualizar tarefa
async function atualizarTarefa(id, dados) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        carregarTarefas();
    } catch (err) {
        console.error('Erro ao atualizar tarefa:', err);
    }
}

// Carregar tarefas ao iniciar
carregarTarefas();
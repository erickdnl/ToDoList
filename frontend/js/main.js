const formTarefa = document.getElementById('form-tarefa');
const tarefaInput = document.getElementById('tarefaInput');
const descricaoInput = document.getElementById('descricaoInput');
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

            // Container do texto
            const divTexto = document.createElement('div');

            // Título da tarefa 
            const titulo = document.createElement('strong');
            titulo.textContent = tarefa.titulo;

            // Descrição da tarefa
            const descricao = document.createElement('p');
            descricao.textContent = tarefa.descricao;
            descricao.style.margin = "0";
            descricao.style.fontSize = "0.9em";
            descricao.style.color = "#555";

            // risca texto se concluída
            if (tarefa.status === 'CONCLUIDA') {
                titulo.style.textDecoration = 'line-through'; 
                descricao.style.textDecoration = 'line-through';
            }

            divTexto.appendChild(titulo);
            divTexto.appendChild(descricao);

            // Botão de status
            const btnStatus = document.createElement('button');
            if (tarefa.status === 'CONCLUIDA') {
                btnStatus.textContent = 'Desfazer';
                btnStatus.style.backgroundColor = '#dc3545';
                btnStatus.style.color = 'white';
            } else {
                btnStatus.textContent = 'Feito';
                btnStatus.style.backgroundColor = '#2878a7';
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
            li.appendChild(divTexto);
            li.appendChild(btnStatus);
            li.appendChild(btnExcluir);
            listaTarefas.appendChild(li);

        });
    } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
    }
}

// Função para adicionar tarefa
async function adicionarTarefa() {
    const titulo = tarefaInput.value.trim();
    const descricao = descricaoInput.value.trim();

    if (!titulo) return alert('Digite um título para a tarefa!');

    const novaTarefa = {
        titulo: titulo,
        descricao: descricao,
        status: "PENDENTE"
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTarefa)
        });

        if (res.ok) {
            tarefaInput.value = '';
            descricaoInput.value = '';
            carregarTarefas();
        } else {
            console.error('Erro ao adicionar tarefa');
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
    }
}

formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarTarefa();
})

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
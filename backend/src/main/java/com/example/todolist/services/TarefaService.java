package com.example.todolist.services;

import com.example.todolist.entities.Tarefa;
import com.example.todolist.repositories.TarefaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    public TarefaService(TarefaRepository repository){
        this.repository = repository;
    }

    // Listar todas as tarefas
    public List<Tarefa> listarTodas(){
        return repository.findAll();
    }

    // Buscar tarefa por ID
    public Tarefa buscarPorId(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com id: " + id));
    }

    // Criar nova tarefa
    public Tarefa criar(Tarefa tarefa){
        return repository.save(tarefa);
    }

    // Atualizar tarefa existente
    public Tarefa atualizar(Long id, Tarefa tarefaAtualizada){
        Tarefa tarefa = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com id " + id));

        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());
        tarefa.setStatus(tarefaAtualizada.getStatus());

        return repository.save(tarefa);
    }

    // Deletar tarefa
    public void deletar(Long id){
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Tarefa não encontrada com id " + id);
        }
        repository.deleteById(id);
    }
}

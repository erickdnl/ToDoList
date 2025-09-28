package com.example.todolist.controllers;

import com.example.todolist.entities.Tarefa;
import com.example.todolist.services.TarefaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private final TarefaService service;

    public TarefaController(TarefaService service){
        this.service = service;
    }

    // Listar tarefas
    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTodas(){
        return ResponseEntity.ok(service.listarTodas());
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarPorId(@PathVariable Long id){
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // Criar tarefa
    @PostMapping
    public ResponseEntity<Tarefa> criar(@RequestBody Tarefa tarefa){
        Tarefa nova = service.criar(tarefa);
        return ResponseEntity.ok(nova);
    }

    // Atualizar tarefa
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizar(@PathVariable Long id, @RequestBody Tarefa tarefa){
        Tarefa atualizada = service.atualizar(id, tarefa);
        return ResponseEntity.ok(atualizada);
    }

    // Deletar por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

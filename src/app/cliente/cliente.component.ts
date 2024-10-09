import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';  

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule]  
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClientes();
  }
   
    

  // Função para obter todos os clientes
  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes,
      (error) => console.error('Erro ao buscar clientes', error)
    );
  }

  // Função para enviar o formulário e salvar um cliente
  onSubmit(clienteForm: NgForm): void {
    console.log("clienteForm: ", clienteForm);
    if (clienteForm.valid) {
      if (this.cliente.id) {
        // Se já existe, atualizar o cliente
        this.clienteService.updateCliente(this.cliente.id,this.cliente).subscribe(
          () => this.getClientes(),
          (error) => console.error('Erro ao atualizar cliente', error)
        );
      } else {
        // Caso contrário, criar um novo cliente
        this.clienteService.createCliente(this.cliente).subscribe(
          () => {
            this.getClientes();
            clienteForm.reset();
          },
          (error) => console.error('Erro ao criar cliente', error)
        );
      }
    }
  }

  // Função para editar um cliente
  onEdit(cliente: Cliente): void {
    this.cliente = { ...cliente };  // Carregar os dados do cliente selecionado no formulário
  }

  // Função para deletar um cliente
  onDelete(clienteId: number): void {
    this.clienteService.deleteCliente(clienteId).subscribe(
      () => this.getClientes(),
      (error) => console.error('Erro ao deletar cliente', error)
    );
  }
}

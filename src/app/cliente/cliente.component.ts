import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';  

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule, ReactiveFormsModule]  
})
export class ClienteComponent implements OnInit {
  mensagem: string = '';
  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  
  constructor(private clienteService: ClienteService) {}

  form = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    telefone : new FormControl(''),
    tipoCliente : new FormControl(''),
    logradouro : new FormControl(''),
    numero : new FormControl(''),
    complemento : new FormControl(''),
    bairro : new FormControl(''),
    cidade : new FormControl(''),
    estado : new FormControl(''),
    contatoNome : new FormControl(''),
    contatoTelefone : new FormControl(''),
    contatoEmail : new FormControl('')
  });

  ngOnInit(): void {
    this.getClientes();
  }
   
  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes,
      (error) => console.error('Erro ao buscar clientes', error)
    );
  }

  onSubmit(clienteForm: NgForm): void {
    console.log("clienteForm: ", clienteForm);
    if (clienteForm.valid) {
      if (this.cliente.id) {        
        this.clienteService.updateCliente(this.cliente.id,this.cliente).subscribe(
          () => this.getClientes(),
          (error) => console.error('Erro ao atualizar cliente', error)
        );
      } else {
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

  onEdit(cliente: Cliente): void {
    this.cliente = { ...cliente };  
  }

  onDelete(clienteId: number): void {
    this.clienteService.deleteCliente(clienteId).subscribe(
      () => this.getClientes(),
      (error) => console.error('Erro ao deletar cliente', error)
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente, TipoPessoa } from '../models/cliente.model';  

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

  form: FormGroup;

  constructor(private clienteService: ClienteService) {
    // Inicializar o objeto cliente com todas as propriedades, incluindo endereco
  this.cliente = {
    id: null,  // Corrigido para aceitar null
    nome: '',
    email: '',
    telefone: '',
    tipoCliente: TipoPessoa.Fisica, // Valor inicial do enum
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    contatos: [{
      nome: '',
      telefone: '',
      email: ''
    }]
  };
   

    // Inicializando o formulário com controles reativos e valores padrão
    this.form = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      tipoCliente: new FormControl('Fisica'), // Valor inicial padrão
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      contatoNome: new FormControl(''),
      contatoTelefone: new FormControl(''),
      contatoEmail: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes,
      (error) => console.error('Erro ao buscar clientes', error)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.cliente.id) {
        // Atualizar o cliente existente
        this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe(
          () => this.getClientes(),
          (error) => console.error('Erro ao atualizar cliente', error)
        );
      } else {
        // Criar um novo cliente
        this.clienteService.createCliente(this.cliente).
        subscribe(
          () => {
            this.getClientes();
            this.form.reset(); // Resetar o formulário após criar o cliente
          },
          (error) => console.error('Erro ao criar cliente', error)
        );
      }
    }
  }
  

  onEdit(cliente: Cliente): void {
    this.cliente = { ...cliente };
    this.populateForm(cliente); // Preenche o formulário com os dados do cliente selecionado
  }

  onDelete(clienteId: number | null): void {
    if (clienteId !== null) {
      this.clienteService.deleteCliente(clienteId).subscribe(
        () => this.getClientes(),
        (error) => console.error('Erro ao deletar cliente', error)
      );
    } else {
      console.error('ID do cliente é null. Não é possível excluir.');
    }
  }

  // Função para preparar os dados do formulário para salvar o cliente
  private prepareSaveCliente(): Cliente {
    const formModel = this.form.value;

    // Mapeia os dados do formulário para o modelo Cliente
    return {
      id: this.cliente.id,
      nome: formModel.nome,
      email: formModel.email,
      telefone: formModel.telefone,
      tipoCliente: formModel.tipoCliente,
      endereco: {
        logradouro: formModel.logradouro,
        numero: formModel.numero,
        complemento: formModel.complemento,
        bairro: formModel.bairro,
        cidade: formModel.cidade,
        estado: formModel.estado
      },
      contatos: [
        {
          nome: formModel.contatoNome,
          telefone: formModel.contatoTelefone,
          email: formModel.contatoEmail
        }
      ]
    };
  }

  // Função para preencher o formulário com os dados de um cliente existente
  private populateForm(cliente: Cliente): void {
    this.form.patchValue({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      tipoCliente: cliente.tipoCliente,
      logradouro: cliente.endereco?.logradouro || '',
      numero: cliente.endereco?.numero || '',
      complemento: cliente.endereco?.complemento || '',
      bairro: cliente.endereco?.bairro || '',
      cidade: cliente.endereco?.cidade || '',
      estado: cliente.endereco?.estado || '',
      contatoNome: cliente.contatos[0]?.nome || '',
      contatoTelefone: cliente.contatos[0]?.telefone || '',
      contatoEmail: cliente.contatos[0]?.email || ''
    });
  }

  // Função para resetar o formulário após salvar ou limpar
  private resetForm(): void {
    this.form.reset({
      nome: '',
      email: '',
      telefone: '',
      tipoCliente: 'Fisica', // Valor padrão
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      contatoNome: '',
      contatoTelefone: '',
      contatoEmail: ''
    });
    this.cliente = new Cliente(); // Resetar o objeto cliente
  }
}

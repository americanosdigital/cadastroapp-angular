import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { VendaService } from '../services/venda.service';
import { Venda } from '../models/venda.model';
import { ClienteService } from '../services/cliente.service';
import { ProdutoService } from '../services/produto.service';
import { Cliente } from '../models/cliente.model';
import { Produto } from '../models/produto.model';
import { ItemVenda } from '../models/item-venda.model';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule, ReactiveFormsModule] 
})
export class VendaComponent implements OnInit {
  ItemVenda: { produto?: Produto, quantidade: number, precoVenda: number, valorTotal: number }[] = [];
  venda: Venda = new Venda();
  clientes: Cliente[] = [];
  produtos: Produto[] = [];

  constructor(
    private vendaService: VendaService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService
  ) {}

  adicionarItem(): void {
    this.ItemVenda.push({
     
      quantidade: 1,
      precoVenda: 0,
      valorTotal: 0
    });
  }

  ngOnInit(): void {
    this.getClientes();
    this.getProdutos();    
  }

  // Função para obter clientes
  getClientes(): void {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes,
      (error) => console.error('Erro ao buscar clientes', error)
    );
  }

  // Função para obter produtos
  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => this.produtos = produtos,
      (error) => console.error('Erro ao buscar produtos', error)
    );
  }

  // Função para enviar a venda
  onSubmit(vendaForm: NgForm): void {
    if (vendaForm.valid) {
      this.vendaService.createVenda(this.venda).subscribe(
        () => {
          this.resetForm(vendaForm);
        },
        (error) => console.error('Erro ao criar venda', error)
      );
    }
  }

  // Função para resetar o formulário
  resetForm(vendaForm: NgForm): void {
    vendaForm.reset();
    this.venda = new Venda();
  }

  // Função para editar um produto
  onEdit(venda: Venda): void {
    this.venda = { ...venda };  // Carregar os dados do venda no formulário
  }

  // Função para deletar um produto
  // onDelete(id: number): void {
  //   this.vendaService.deleteVenda(id).subscribe(
  //     () => this.getVenda(),
  //     (error) => console.error('Erro ao deletar Venda', error)
  //   );
  // }

}

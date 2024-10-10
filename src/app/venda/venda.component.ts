import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { VendaService } from '../services/venda.service';
import { Venda } from '../models/venda.model';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule]  
})
export class VendaComponent implements OnInit {
 // venda: Venda = new Venda();
  vendas: Venda[] = [];
  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  item: { produto: Produto, quantidade: number, precoVenda: number, valorTotal: number } = {
    produto: {} as Produto,
    quantidade: 1,
    precoVenda: 0,
    valorTotal: 0
  };

  venda: Venda = {
    id: 0, // Inicializando os campos de venda

    //clienteId: null,
    dataEmissao: new Date(),
    itens: [], // Certifique-se de inicializar com um array vazio
    numero: 0,
    cliente: new Cliente,
    produto: new Produto,
    produtoId: 0,
    valorTotal: 0
  };

  constructor(private vendaService: VendaService, private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.getVendas();
    this.getProdutos();  // Carrega os produtos disponíveis
  }

  // Função para obter todas as vendas
  getVendas(): void {
    this.vendaService.getVendas().subscribe(
      (vendas) => this.vendas = vendas,
      (error) => console.error('Erro ao buscar vendas', error)
    );
  }

  // Função para obter todos os produtos (para adicionar itens à venda)
  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(      
      (produtos) => this.produtos = produtos,
      (error) => console.error('Erro ao buscar produtos', error)
    );
  }

  // Função para adicionar um item à venda
  adicionarItem(): void {
    if (this.item.produto && this.item.quantidade > 0) {
      this.item.precoVenda = this.item.produto.precoVenda;
      this.item.valorTotal = this.item.precoVenda * this.item.quantidade;

      if (!this.venda.itens) {
        this.venda.itens = [];
      }

      this.venda.itens.push({ 
        produto: this.item.produto,
        quantidade: this.item.quantidade,
        precoVenda: this.item.precoVenda,
        valorTotal: this.item.valorTotal
      });

      // Reseta o item para adicionar o próximo
      this.item = {
        produto: {} as Produto,
        quantidade: 1,
        precoVenda: 0,
        valorTotal: 0
      };
    }
  }

  // Função para enviar o formulário e salvar uma venda
  onSubmit(vendaForm: NgForm): void {
    if (vendaForm.valid && this.venda.itens.length > 0) {
      this.vendaService.createVenda(this.venda).subscribe(
        () => {
          this.getVendas();
          vendaForm.reset();
        },
        (error) => console.error('Erro ao criar venda', error)
      );
    } else {
      console.error('Formulário inválido ou sem itens de venda');
    }
  }

  // Função para editar uma venda
  onEdit(venda: Venda): void {
    this.venda = { ...venda };  // Carrega os dados da venda selecionada no formulário
  }

  // Função para deletar uma venda
  onDelete(vendaId: number): void {
    this.vendaService.deleteVenda(vendaId).subscribe(
      () => this.getVendas(),
      (error) => console.error('Erro ao deletar venda', error)
    );
  }
}

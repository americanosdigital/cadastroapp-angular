import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule]  
})
export class ProdutoComponent implements OnInit {
  produto: Produto = new Produto();
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.getProdutos();  // Carrega os produtos ao iniciar o componente
  }

  // Função para obter todos os produtos
  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => this.produtos = produtos,
      (error) => console.error('Erro ao buscar produtos', error)
    );
  }

  // Função para salvar um produto
  onSubmit(produtoForm: NgForm): void {
    if (produtoForm.valid) {
      if (this.produto.codigo) {
        // Atualizar produto existente
        this.produtoService.updateProduto(this.produto.codigo, this.produto).subscribe(
          () => this.getProdutos(),
          (error) => console.error('Erro ao atualizar produto', error)
        );
      } else {
        // Criar novo produto
        this.produtoService.createProduto(this.produto).subscribe(
          () => {
            this.getProdutos();
            produtoForm.reset();
          },
          (error) => console.error('Erro ao criar produto', error)
        );
      }
    }
  }

  // Função para editar um produto
  onEdit(produto: Produto): void {
    this.produto = { ...produto };  // Carregar os dados do produto no formulário
  }

  // Função para deletar um produto
  onDelete(codigo: string): void {
    this.produtoService.deleteProduto(codigo).subscribe(
      () => this.getProdutos(),
      (error) => console.error('Erro ao deletar produto', error)
    );
  }
}


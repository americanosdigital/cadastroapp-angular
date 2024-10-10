import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class ProdutoComponent implements OnInit {
  
  form: FormGroup;
  // Inicializando o produto com valores padrão, incluindo o id
  produto: Produto = {
    id: 0,            // Inicializando o id como null
    codigo: '',
    nome: '',
    descricao: '',
    precoVenda: 0
  };
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {

     // Inicializando o formulário com controles reativos e valores padrão
     this.form = new FormGroup({
      codigo: new FormControl(''),
      nome: new FormControl(''),
      descricao: new FormControl(''),
      precoVenda: new FormControl(''),
     });

  }

  ngOnInit(): void {
    this.getProdutos();  // Carrega os produtos ao iniciar o componente
  }

  // Função para obter todos os produtos
  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos;
        console.log('Produtos carregados', produtos);
      },
      (error) => console.error('Erro ao buscar produtos', error)
    );
  }

  // Função para salvar um produto
  onSubmit(produtoForm: NgForm): void {
    if (produtoForm.valid) {
      if (this.produto.id) {
        // Atualizar produto existente
        this.produtoService.updateProduto(this.produto.id, this.produto).subscribe(          
          () => {console.log("produtoId :", this.produto.id);
            this.getProdutos();
            produtoForm.reset();
            console.log('Produto atualizado com sucesso');
          },
          (error) => console.error('Erro ao atualizar produto', error)
        );
      } else {
        // Criar novo produto
        this.produtoService.createProduto(this.produto).subscribe(
          () => {
            this.getProdutos();
            produtoForm.reset();
            console.log('Produto criado com sucesso');
          },
          (error) => console.error('Erro ao criar produto', error)
        );
      }
    }
  }

  // Função para editar um produto
  onEdit(produto: Produto): void {
    this.produto = { ...produto };  // Carregar os dados do produto no formulário
    console.log('Editando produto', produto);
  }

  // Função para deletar um produto
  onDelete(id: number | null): void {
    if (id !== null) {
      this.produtoService.deleteProduto(id).subscribe(
        () => this.getProdutos(),
        (error) => console.error('Erro ao deletar produto', error)
      );
    } else {
      console.error('ID do produto é null. Não é possível excluir.');
    }
  }
}   
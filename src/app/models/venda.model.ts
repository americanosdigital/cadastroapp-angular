import { Cliente } from './cliente.model';
import { ItemVenda } from './item-venda.model';
import { Produto } from './produto.model';

export class Venda {
  id!: number;
  numero!: number;
  dataEmissao!: Date;
  cliente!: Cliente; 
  produto!: Produto;
  produtoId!: number;
  itens!: ItemVenda[]; 
  valorTotal!: number;
}

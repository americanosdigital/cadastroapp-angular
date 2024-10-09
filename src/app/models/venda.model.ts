import { Cliente } from './cliente.model';
import { ItemVenda } from './item-venda.model';

export class Venda {
  numero!: number;
  dataEmissao!: Date;
  cliente!: Cliente; 
  itens!: ItemVenda[]; 
  valorTotal!: number;
}

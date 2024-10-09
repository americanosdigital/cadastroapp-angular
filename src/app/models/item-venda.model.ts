import { Produto } from './produto.model';

export class ItemVenda {
  produto!: Produto;
  quantidade!: number;
  precoVenda!: number;
  valorTotal!: number;
}
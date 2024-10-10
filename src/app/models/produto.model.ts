export class Produto {
  id!: number;  // O `id` pode ser opcional, ou seja, pode ser `undefined`
  codigo!: string;
  nome!: string;
  descricao!: string;
  precoVenda!: number;
}

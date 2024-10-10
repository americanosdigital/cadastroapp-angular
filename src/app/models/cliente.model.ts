export class Cliente {
  id!: number | null; // Permitir que id seja null inicialmente
  nome!: string;
  email!: string;
  telefone!: string;
  tipoCliente!: TipoPessoa; // Usar o enum ou tipo correto para tipoCliente
  endereco!: Endereco;
  contatos!: Contato[];

  constructor() {
    this.id = null; // Inicia como null, pode ser atualizado quando um valor real estiver disponível
    this.nome = '';
    this.email = '';
    this.telefone = '';
    this.tipoCliente = TipoPessoa.Fisica; // Atribuir o valor correto do enum
    this.endereco = new Endereco();
    this.contatos = [new Contato()];
  }
}

export enum TipoPessoa {
  Fisica = 'Fisica',
  Juridica = 'Juridica'
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  constructor() {
    this.logradouro = '';
    this.numero = '';
    this.complemento = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
  }
}

export class Contato {
  nome: string;
  telefone: string;
  email: string;

  constructor() {
    this.nome = '';
    this.telefone = '';
    this.email = '';
  }
}

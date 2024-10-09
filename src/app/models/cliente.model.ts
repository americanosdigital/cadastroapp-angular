// src/app/models/cliente.model.ts
import { Endereco } from './endereco.model';
import { Contato } from './contato.model';

export class Cliente {
  id!: number;
  nome!: string;
  tipoCliente!: TipoPessoa; 
  email!: string;
  telefone!: string;
  endereco!: Endereco; 
  contatos!: Contato[]; 

  // Campos específicos para Pessoa Física
  cpf?: string;
  dataNascimento?: Date;
  identidade?: string;

  // Campos específicos para Pessoa Jurídica
  cnpj?: string;
  nomeFantasia?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
}





// Enum para definir o tipo de pessoa
export enum TipoPessoa {
  Fisica = 'Fisica',
  Juridica = 'Juridica'
}

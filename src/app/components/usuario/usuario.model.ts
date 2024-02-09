import { Perfil } from "../perfil/perfil.model";

export interface IUsuario {
    id: number;
    nome: string;
    senha: string;
    cpf: string;
    ativo: boolean;
    perfil: Perfil; 
  }

  export class Usuario implements IUsuario{
    id: number;
    nome: string;
    senha: string;
    cpf: string;
    ativo: boolean;
    perfil: Perfil;

    constructor( 
    id: number = 0, 
    nome: string = '', 
    senha: string = '', 
    cpf: string = '', 
    ativo: boolean = false,
    perfil: Perfil = new Perfil()
    ) {
      this.id = id;
      this.nome = nome;
      this.senha = senha;
      this.cpf = cpf;
      this.ativo = ativo;
      this.perfil = perfil;
    }
  
} 
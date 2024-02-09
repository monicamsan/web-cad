
export interface IAuth {
    nome: string;
    senha: string;
  }

  export class Auth implements IAuth{
    nome: string;
    senha: string;

    constructor( 
    nome: string = '', 
    senha: string = '', 
    ) {
      this.nome = nome;
      this.senha = senha;
    }
  
} 
export interface IPerfil {
    id: number;
    nome: string;
    admin: boolean;
    ativo: boolean;
  }

  export class Perfil implements IPerfil{
    id: number;
    nome: string;
    admin: boolean;
    ativo: boolean;

    constructor(   
    id: number = 0,
    nome: string = '', 
    admin: boolean = false,
    ativo: boolean = false 
    ) {
      this.id = id;
      this.nome = nome;
      this.admin = admin;
      this.ativo = ativo;
    }
  
} 
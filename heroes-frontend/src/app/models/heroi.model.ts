import { Superpoder } from './superpoder.model';

export interface Heroi {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: Date;
  altura: number;
  peso: number;
  superpoderes: Superpoder[];
}

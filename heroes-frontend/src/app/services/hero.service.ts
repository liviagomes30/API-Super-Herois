import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heroi } from '../models/heroi.model';
import { Superpoder } from '../models/superpoder.model';
import { HeroiDto } from '../models/heroi-dto.model';

// marca esta classe como um serviço Angular
@Injectable({
  providedIn: 'root', // fornecer serviço na raiz da aplicacao - uma instância única disponível em toda a aplicação
})
export class HeroService {
  private apiUrl = 'http://localhost:5150/api';

  // Angular cria e "injeta" automaticamente uma instância do HttpClient
  constructor(private http: HttpClient) {}

  getHerois(): Observable<Heroi[]> {
    return this.http.get<Heroi[]>(`${this.apiUrl}/herois`);
  }

  getHeroi(id: number): Observable<Heroi> {
    return this.http.get<Heroi>(`${this.apiUrl}/herois/${id}`);
  }

  createHeroi(heroi: HeroiDto): Observable<Heroi> {
    return this.http.post<Heroi>(`${this.apiUrl}/herois`, heroi);
  }

  updateHeroi(id: number, heroi: HeroiDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/herois/${id}`, heroi);
  }

  deleteHeroi(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/herois/${id}`);
  }

  getSuperpoderes(): Observable<Superpoder[]> {
    return this.http.get<Superpoder[]>(`${this.apiUrl}/superpoderes`);
  }
}

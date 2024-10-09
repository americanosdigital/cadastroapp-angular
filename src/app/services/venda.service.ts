import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'https://localhost:5160/api/produtos';

  constructor(private http: HttpClient) { }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  getVenda(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.apiUrl}/${id}`);
  }

  createVenda(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  updateVenda(id: number, venda: Venda): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, venda);
  }

  deleteVenda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5160/api/clientes';  // Verifique se a URL está correta

  constructor(private http: HttpClient) {}

  // Método para obter todos os clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // Método para criar um novo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  // Método para atualizar um cliente existente
  updateCliente(id: number, cliente: Cliente): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<void>(url, cliente);
  }

  // Método para deletar um cliente
  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Estudante {
  id: number;
  cpf: string;
  nomeCompleto: string;
  rg: string;
  dataNascimento: string;
  universidade: string;
  campus: string;
  turno: string;
  previsaoConclusao: string;
  declaracaoVinculoUrl: string;
  comprovanteResidenciaUrl: string;
  statusCadastro: 'Pendente' | 'Aprovado' | 'Recusado';
}

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {
  private http = inject(HttpClient)
  private readonly serviceUrl = 'http://localhost:3000/estudantes';

  //Post
  cadastrar(dadosEstudante: Omit<Estudante, 'id' | 'statusCadastro'>): Observable<Estudante> {
    const payload = {... dadosEstudante, statusCadastro: 'Pendente' as const };
    return this.http.post<Estudante>(this.serviceUrl, payload);
  }

  //Get
  getSolicitaçõesPendentes(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(`${this.serviceUrl}?statusCadastro=Pendente`)
  }

  //Get All
  getTodosEstudantes(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(this.serviceUrl);
  }

  //Patch
  atualizarStatus(id: number, novoStatus: 'Aprovado' | 'Recusado'): Observable<Estudante>{
    return this.http.patch<Estudante>(
      `${this.serviceUrl}/${id}`, { statusCadastro: novoStatus }
    )
  }

  constructor() { }
}

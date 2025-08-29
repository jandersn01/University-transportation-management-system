import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface EstudanteListDTO {
  id: number;
  nomeCompleto: string;
  cpf: string;
  universidade: string;
  campus: string;
  dataNascimento: string;
  statusCadastro: 'PENDENTE' | 'APROVADO' | 'RECUSADO'; // Backend usa enum em MAIÚSCULO
}


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
  statusCadastro: 'PENDENTE' | 'APROVADO' | 'RECUSADO';
}

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {
  private http = inject(HttpClient)
  private readonly serviceUrl = 'http://localhost:8080/api/students';

  //Post
  cadastrar(dadosEstudante: Omit<Estudante, 'id' | 'statusCadastro'>): Observable<Estudante> {
    const payload = {... dadosEstudante, statusCadastro: 'Pendente' as const };
    return this.http.post<Estudante>(this.serviceUrl, payload);
  }

  //Get
  getSolicitaçõesPendentes(): Observable<EstudanteListDTO[]> {
    return this.http.get<EstudanteListDTO[]>(`${this.serviceUrl}?statusCadastro=PENDENTE`)
  }

  //Get All
  getTodosEstudantes(): Observable<EstudanteListDTO[]> {
    return this.http.get<EstudanteListDTO[]>(this.serviceUrl);
  }

  getEstudantePorId(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.serviceUrl}/${id}`);
  }

  //Patch
  atualizarStatus(id: number, novoStatus: 'APROVADO' | 'RECUSADO'): Observable<Estudante>{
    return this.http.patch<Estudante>(
      `${this.serviceUrl}/${id}`, { statusCadastro: novoStatus }
    )
  }

  constructor() { }
}

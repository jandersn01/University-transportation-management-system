import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


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
  private readonly http = inject(HttpClient)

  private readonly baseUrl = environment.apiUrl;
  private readonly serviceUrl = `${this.baseUrl}/students`;

  //Post
  cadastrar(dadosEstudante: Omit<Estudante, 'id' | 'statusCadastro'>): Observable<Estudante> {
    const payload = {... dadosEstudante, statusCadastro: 'PENDENTE' as const };
    return this.http.post<Estudante>(this.serviceUrl, payload);
  }

  //Get
  getSolicitacoesPendentes(): Observable<EstudanteListDTO[]> {
    return this.http.get<EstudanteListDTO[]>(`${this.serviceUrl}?statusCadastro=PENDENTE`)
  }

  //Get All
  getTodosEstudantes(): Observable<EstudanteListDTO[]> {
    return this.http.get<EstudanteListDTO[]>(this.serviceUrl);
  }

  getEstudantePorId(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.serviceUrl}/${id}`);
  }

  getEstudantesAprovados(): Observable<EstudanteListDTO[]> {
    return this.http.get<EstudanteListDTO[]>(`${this.serviceUrl}?statusCadastro=APROVADO`);
  }

  //Patch
  atualizarStatus(id: number, novoStatus: 'APROVADO' | 'RECUSADO'): Observable<Estudante>{
    return this.http.patch<Estudante>(
      `${this.serviceUrl}/${id}/status`, { status: novoStatus }
    )
  }

  revogarEstudante(payload: { id: number; motivo: string; justificativa: string }) {
    return this.http.delete(`${this.serviceUrl}/${payload.id}`);
  }

  //constructor() { }
}
@Injectable({ providedIn: 'root' })
export class ViagemService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  //constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(`${this.baseUrl}/api/viagens`);
  }
}

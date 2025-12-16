import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as L from 'leaflet';

export type Turno = 'MANHA' | 'TARDE' | 'NOITE';

export interface Rota {
  id: number;
  nome: string;
  turno: Turno;
  universidades: string[];
  caminho?: L.LatLngExpression[];
  paradas?: { nome: string; coords: L.LatLngExpression }[];
}

export interface RotaForm {
  id?: number;
  nome: string;
  turno: Turno;
  universidades: string[];
}

export interface EstatisticasRotas {
  total: number;
  manha: number;
  tarde: number;
  noite: number;
}

@Injectable({
  providedIn: 'root'
})
export class RotasService {

  readonly listaUniversidades = [
    'UFPB',
    'UEPB',
    'IFPB',
    'UNIPE',
    'FACENE',
    'Maurício de Nassau',
    'UNIESP'
  ];

  // Coordenadas base
  private readonly coords = {
    BAYEUX: [-7.1249, -34.9314] as L.LatLngExpression,
    UNIPE: [-7.159, -34.858] as L.LatLngExpression,
    UFPB: [-7.139, -34.846] as L.LatLngExpression,
    IFPB: [-7.132, -34.872] as L.LatLngExpression,
    UEPB: [-7.149, -34.869] as L.LatLngExpression,
    FACENE: [-7.198, -34.840] as L.LatLngExpression,
    NASSAU: [-7.145, -34.873] as L.LatLngExpression,
    UNIESP: [-7.190, -34.845] as L.LatLngExpression
  };

  /* =======================
     CAMINHOS DAS ROTAS
     ======================= */

  // MANHÃ – rota integrada principal
  private readonly CAMINHO_MANHA: L.LatLngExpression[] = [
    [-7.1249, -34.9314],
    [-7.1350, -34.9100],
    [-7.1480, -34.8850],
    [-7.1590, -34.8580],
    [-7.1470, -34.8480],
    [-7.1390, -34.8460],
    [-7.1340, -34.8660],
    [-7.1320, -34.8720],
    [-7.1440, -34.8700],
    [-7.1490, -34.8690],
    [-7.1300, -34.9100],
    [-7.1249, -34.9314]
  ];

  // TARDE – zona sul / faculdades privadas
  private readonly CAMINHO_TARDE: L.LatLngExpression[] = [
    [-7.1249, -34.9314],
    [-7.1500, -34.9000],
    [-7.1750, -34.8700],
    [-7.1900, -34.8450],
    [-7.1980, -34.8400],
    [-7.1700, -34.8800],
    [-7.1400, -34.9100],
    [-7.1249, -34.9314]
  ];

  // NOITE – centro universitário
  private readonly CAMINHO_NOITE_CENTRO: L.LatLngExpression[] = [
    [-7.1249, -34.9314],
    [-7.1350, -34.9050],
    [-7.1450, -34.8730],
    [-7.1490, -34.8690],
    [-7.1400, -34.9000],
    [-7.1249, -34.9314]
  ];

  // NOITE – rota curta técnica
  private readonly CAMINHO_NOITE_TECNICA: L.LatLngExpression[] = [
    [-7.1249, -34.9314],
    [-7.1380, -34.9000],
    [-7.1340, -34.8800],
    [-7.1320, -34.8720],
    [-7.1249, -34.9314]
  ];

  constructor() {}

  getRotas(): Observable<Rota[]> {
    const dadosMock: Rota[] = [

      /* =======================
         ROTA 01 – MANHÃ
         ======================= */
      {
        id: 1,
        nome: 'Rota Integrada Manhã – UNIPE / UFPB / IFPB / UEPB',
        turno: 'MANHA',
        universidades: ['UNIPE', 'UFPB', 'IFPB', 'UEPB'],
        paradas: [
          { nome: 'Saída: Bayeux', coords: this.coords.BAYEUX },
          { nome: 'UNIPE', coords: this.coords.UNIPE },
          { nome: 'UFPB', coords: this.coords.UFPB },
          { nome: 'IFPB Jaguaribe', coords: this.coords.IFPB },
          { nome: 'UEPB – Cristo', coords: this.coords.UEPB },
          { nome: 'Retorno: Bayeux', coords: this.coords.BAYEUX }
        ],
        caminho: this.CAMINHO_MANHA
      },

      /* =======================
         ROTA 02 – TARDE
         ======================= */
      {
        id: 2,
        nome: 'Rota Zona Sul Tarde – UNIESP / FACENE',
        turno: 'TARDE',
        universidades: ['UNIESP', 'FACENE'],
        paradas: [
          { nome: 'Saída: Bayeux', coords: this.coords.BAYEUX },
          { nome: 'UNIESP', coords: this.coords.UNIESP },
          { nome: 'FACENE', coords: this.coords.FACENE },
          { nome: 'Retorno: Bayeux', coords: this.coords.BAYEUX }
        ],
        caminho: this.CAMINHO_TARDE
      },

      /* =======================
         ROTA 03 – NOITE
         ======================= */
      {
        id: 3,
        nome: 'Rota Centro Noite – Maurício de Nassau / UEPB',
        turno: 'NOITE',
        universidades: ['Maurício de Nassau', 'UEPB'],
        paradas: [
          { nome: 'Saída: Bayeux', coords: this.coords.BAYEUX },
          { nome: 'Maurício de Nassau', coords: this.coords.NASSAU },
          { nome: 'UEPB – Cristo', coords: this.coords.UEPB },
          { nome: 'Retorno: Bayeux', coords: this.coords.BAYEUX }
        ],
        caminho: this.CAMINHO_NOITE_CENTRO
      },

      /* =======================
         ROTA 04 – NOITE
         ======================= */
      {
        id: 4,
        nome: 'Rota Técnica Noite – IFPB',
        turno: 'NOITE',
        universidades: ['IFPB'],
        paradas: [
          { nome: 'Saída: Bayeux', coords: this.coords.BAYEUX },
          { nome: 'IFPB Jaguaribe', coords: this.coords.IFPB },
          { nome: 'Retorno: Bayeux', coords: this.coords.BAYEUX }
        ],
        caminho: this.CAMINHO_NOITE_TECNICA
      }
    ];

    return of(dadosMock).pipe(delay(800));
  }

  salvarRota(rota: Rota): Observable<Rota> {
    return of(rota).pipe(delay(500));
  }

  excluirRota(id: number): Observable<boolean> {
    return of(true).pipe(delay(500));
  }
}

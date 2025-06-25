import { Component, inject, OnInit } from '@angular/core';
import { Estudante, EstudantesService } from '../../../../services/estudantes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-analise-de-cadastro',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './analise-de-cadastro.html',
  styleUrl: './analise-de-cadastro.css'
})
export class AnaliseDeCadastro implements OnInit {
  private estudanteService = inject(EstudantesService);
  solicitacoesPendentes: Estudante[] = [];

  carregarSolicitacoes(): void{
    this.estudanteService.getSolicitaçõesPendentes().subscribe(dados => {
      this.solicitacoesPendentes = dados;
    });
  }

  aprovarSolicitacao(id:number): void{
    this.estudanteService.atualizarStatus(id, 'Aprovado').subscribe(()=>
    {this.solicitacoesPendentes = this.solicitacoesPendentes
      .filter(s => s.id !== id);
    })
  }

  recusarSolicitacao(id:number): void{
    this.estudanteService.atualizarStatus(id, 'Recusado').subscribe(()=>
    {this.solicitacoesPendentes = this.solicitacoesPendentes
      .filter(s => s.id !== id);
    })
  }

  ngOnInit(): void{
    this.carregarSolicitacoes();
  }

}

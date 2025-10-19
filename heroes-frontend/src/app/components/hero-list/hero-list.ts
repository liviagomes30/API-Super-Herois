import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { NotificationService } from '../../services/notification.service';
import { HeroService } from '../../services/hero.service';
import { Heroi } from '../../models/heroi.model';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css',
})

// OnInit para executar código na inicialização
export class HeroList implements OnInit {
  herois: Heroi[] = [];
  loading = false;
  errorMessage = '';

  // recebe instâncias injetadas do HeroService e do Router
  constructor(
    private heroService: HeroService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // chamado 1 vez quando o componente é inicializado
  ngOnInit(): void {
    this.loadHerois();
  }

  loadHerois(): void {
    this.loading = true;
    this.errorMessage = '';

    // .subscribe() ouve o Observable para receber os dados ou erros
    this.heroService.getHerois().subscribe({
      next: (data) => {
        this.herois = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar heróis:', error);
        if (error.status === 204) {
          this.errorMessage = 'Nenhum super-herói cadastrado ainda.';
          this.notificationService.showInfo('Nenhum super-herói cadastrado ainda.');
        } else {
          this.errorMessage = 'Erro ao carregar heróis. Tente novamente.';
          this.notificationService.showError(
            'Erro ao carregar a lista de heróis. Tente novamente.'
          );
        }
        this.herois = [];
        this.loading = false;
      },
    });
  }

  // navega para a tela de detalhes do herói com o ID
  viewHero(id: number): void {
    this.router.navigate(['/herois', id]);
  }

  editHero(id: number): void {
    this.router.navigate(['/herois/editar', id]);
  }

  deleteHero(id: number, nomeHeroi: string): void {
    this.notificationService.confirmDelete(nomeHeroi).subscribe((confirmed) => {
      if (confirmed) {
        this.heroService.deleteHeroi(id).subscribe({
          next: (response) => {
            this.notificationService.showSuccess(
              response.message || `${nomeHeroi} foi excluído com sucesso!`
            );

            this.loadHerois();
          },
          error: (error) => {
            console.error('Erro ao excluir herói:', error);

            if (error.status === 404) {
              this.notificationService.showError('Herói não encontrado.');
            } else if (error.error?.message) {
              this.notificationService.showError(error.error.message);
            } else {
              this.notificationService.showError('Erro ao excluir o herói. Tente novamente.');
            }
          },
        });
      }
    });
  }

  createNew(): void {
    this.router.navigate(['/herois/novo']);
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }
}

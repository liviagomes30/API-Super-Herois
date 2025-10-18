import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { HeroService } from '../../services/hero.service';
import { Heroi } from '../../models/heroi.model';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail implements OnInit {
  heroi: Heroi | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHero(+id);
    }
  }

  loadHero(id: number): void {
    this.loading = true;
    this.heroService.getHeroi(id).subscribe({
      next: (data) => {
        this.heroi = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar herói:', error);
        this.errorMessage = 'Herói não encontrado.';
        this.loading = false;
      },
    });
  }

  editHero(): void {
    if (this.heroi) {
      this.router.navigate(['/heroes/edit', this.heroi.id]);
    }
  }

  deleteHero(): void {
    if (this.heroi && confirm(`Tem certeza que deseja excluir ${this.heroi.nomeHeroi}?`)) {
      this.heroService.deleteHeroi(this.heroi.id).subscribe({
        next: (response) => {
          alert(response.message || 'Herói excluído com sucesso!');
          this.router.navigate(['/heroes']);
        },
        error: (error) => {
          console.error('Erro ao excluir herói:', error);
          alert('Erro ao excluir herói. Tente novamente.');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/heroes']);
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

  formatarData(data: Date): string {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR');
  }
}

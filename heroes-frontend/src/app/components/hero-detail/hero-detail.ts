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
import { NotificationService } from '../../services/notification.service';

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

  // Mapa de ícones para cada tipo de superpoder
  powerIcons: { [key: string]: string } = {
    'super força': 'fitness_center',
    força: 'fitness_center',
    voo: 'flight',
    voar: 'flight',
    invisibilidade: 'visibility_off',
    velocidade: 'speed',
    'super velocidade': 'speed',
    telepatia: 'psychology',
    'ler mentes': 'psychology',
    regeneração: 'healing',
    cura: 'healing',
    'visão raio-x': 'visibility',
    'raio-x': 'visibility',
    telecinese: 'pan_tool',
    'mover objetos': 'pan_tool',
    'super audição': 'hearing',
    audição: 'hearing',
    congelamento: 'ac_unit',
    gelo: 'ac_unit',
    fogo: 'local_fire_department',
    'controle de fogo': 'local_fire_department',
    raio: 'bolt',
    eletricidade: 'bolt',
    água: 'water_drop',
    'controle de água': 'water_drop',
    terra: 'landscape',
    'controle da terra': 'landscape',
    vento: 'air',
    'controle do vento': 'air',
    transformação: 'transform',
    metamorfose: 'transform',
    teia: 'web',
    teias: 'web',
    garras: 'cut',
    'super inteligência': 'lightbulb',
    inteligência: 'lightbulb',
    elasticidade: 'settings_ethernet',
    elástico: 'settings_ethernet',
    duplicação: 'content_copy',
    clone: 'content_copy',
  };

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
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

  // Método para obter o ícone baseado no nome do superpoder
  getPowerIcon(powerName: string): string {
    if (!powerName) {
      console.warn('Power name is null or undefined');
      return 'bolt'; // ícone padrão
    }

    const normalizedName = powerName.toLowerCase().trim();

    for (const [key, icon] of Object.entries(this.powerIcons)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return icon;
      }
    }
    return 'bolt';
  }

  editHero(): void {
    if (this.heroi) {
      this.router.navigate(['/heroes/edit', this.heroi.id]);
    }
  }

  deleteHero(): void {
    if (!this.heroi) return;

    const nomeHeroi = this.heroi.nomeHeroi;
    const heroiId = this.heroi.id;

    this.notificationService.confirmDelete(nomeHeroi).subscribe((confirmed) => {
      if (confirmed) {
        this.heroService.deleteHeroi(heroiId).subscribe({
          next: (response) => {
            this.notificationService.showSuccess(
              response.message || `${nomeHeroi} foi excluído com sucesso!`
            );
            this.router.navigate(['/heroes']);
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Superpoder } from '../../models/superpoder.model';
import { HeroiDto } from '../../models/heroi-dto.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './hero-form.html',
  styleUrls: ['./hero-form.css'],
})
export class HeroForm implements OnInit {
  heroForm: FormGroup;
  superpoderes: Superpoder[] = [];
  selectedPowers: number[] = [];

  isEditMode = false;
  heroId: number | null = null;

  loading = false;
  loadingPowers = false;
  submitting = false;

  error: string | null = null;
  showPowersError = false;

  maxDate = new Date();
  minDate = new Date(1900, 0, 1);

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   
    this.heroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      nomeHeroi: ['', [Validators.required, Validators.maxLength(120)]],
      dataNascimento: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.min(0.01), Validators.max(3)]],
      peso: ['', [Validators.required, Validators.min(0.01), Validators.max(500)]],
    });
  }

  ngOnInit(): void {
    this.loadSuperpoderes();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.heroId = +params['id'];
        this.loadHero(this.heroId);
      }
    });
  }

  loadSuperpoderes(): void {
    this.loadingPowers = true;
    this.heroService.getSuperpoderes().subscribe({
      next: (data) => {
        this.superpoderes = data;
        this.loadingPowers = false;
      },
      error: (err) => {
        console.error('Erro ao carregar superpoderes:', err);
        this.error = 'Erro ao carregar superpoderes. Tente novamente.';
        this.loadingPowers = false;
      },
    });
  }

  loadHero(id: number): void {
    this.loading = true;
    this.error = null;

    this.heroService.getHeroi(id).subscribe({
      next: (hero) => {
        this.heroForm.patchValue({
          nome: hero.nome,
          nomeHeroi: hero.nomeHeroi,
          dataNascimento: new Date(hero.dataNascimento),
          altura: hero.altura,
          peso: hero.peso,
        });

        this.selectedPowers = hero.superpoderes.map((s) => s.id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar herói:', err);
        this.error = 'Erro ao carregar os dados do herói. Verifique se o ID é válido.';
        this.loading = false;
      },
    });
  }

  isPowerSelected(powerId: number): boolean {
    return this.selectedPowers.includes(powerId);
  }

  onPowerChange(event: MatCheckboxChange, powerId: number): void {
    if (event.checked) {
      if (!this.selectedPowers.includes(powerId)) {
        this.selectedPowers.push(powerId);
      }
    } else {
      this.selectedPowers = this.selectedPowers.filter((id) => id !== powerId);
    }

    if (this.selectedPowers.length > 0) {
      this.showPowersError = false;
    }
  }

  onSubmit(): void {
    if (this.selectedPowers.length === 0) {
      this.showPowersError = true;
      return;
    }

    // Valida a data manualmente antes de submeter
    const dateControl = this.heroForm.get('dataNascimento');
    if (dateControl?.value && !this.isValidDate(dateControl.value)) {
      dateControl.setErrors({ invalidDate: true });
      this.heroForm.markAllAsTouched();
      return;
    }

    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = null;

    const heroDto: HeroiDto = {
      nome: this.heroForm.value.nome,
      nomeHeroi: this.heroForm.value.nomeHeroi,
      superpoderesIds: this.selectedPowers,
      dataNascimento: this.formatDate(this.heroForm.value.dataNascimento),
      altura: parseFloat(this.heroForm.value.altura),
      peso: parseFloat(this.heroForm.value.peso),
    };

    const operation = this.isEditMode
      ? this.heroService.updateHeroi(this.heroId!, heroDto)
      : this.heroService.createHeroi(heroDto);

    operation.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/herois']);
      },
      error: (err) => {
        console.error('Erro ao salvar herói:', err);

        if (err.status === 400 && err.error?.message) {
          this.error = err.error.message;
        } else if (err.status === 409) {
          this.error = 'Este nome de herói já está em uso. Escolha outro nome.';
          this.heroForm.get('nomeHeroi')?.setErrors({ duplicate: true });
        } else {
          this.error = 'Erro ao salvar o herói. Tente novamente.';
        }

        this.submitting = false;
      },
    });
  }

  private isValidDate(value: any): boolean {
    if (!value) return false;

    const date = value instanceof Date ? value : new Date(value);

    // Data inválida
    if (isNaN(date.getTime())) {
      return false;
    }

    // Data no futuro
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (date > today) {
      return false;
    }

    // Data muito antiga
    const minDate = new Date(1900, 0, 1);
    if (date < minDate) {
      return false;
    }

    return true;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  }

  onCancel(): void {
    this.router.navigate(['/herois']);
  }

  voltar(): void {
    this.router.navigate(['/herois']);
  }
}

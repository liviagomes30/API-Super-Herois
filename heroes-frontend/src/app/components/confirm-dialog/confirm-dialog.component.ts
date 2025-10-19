import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog" [class]="'dialog-' + data.type">
      <div class="dialog-header">
        <mat-icon class="dialog-icon">
          {{ getIcon() }}
        </mat-icon>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>

      <mat-dialog-content>
        <p class="dialog-message">{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-stroked-button (click)="onCancel()" class="btn-cancel">
          <mat-icon>close</mat-icon>
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button mat-raised-button (click)="onConfirm()" [class]="'btn-confirm btn-' + data.type">
          <mat-icon>{{ getConfirmIcon() }}</mat-icon>
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      /* ===== ESTILO COMIC BOOK - DIALOG ===== */
      .confirm-dialog {
        min-width: 450px;
        padding: 24px;
        background: white;
        border: 4px solid rgba(0, 0, 0, 0.3);
        border-radius: 16px;
        box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3);
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 3px dashed rgba(0, 0, 0, 0.1);
      }

      .dialog-icon {
        font-size: 56px;
        width: 56px;
        height: 56px;
        animation: iconPulse 1.5s ease-in-out infinite;
      }

      @keyframes iconPulse {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      .dialog-warning .dialog-icon {
        color: #ffd600;
        text-shadow: 2px 2px 0px rgba(245, 127, 23, 0.5);
      }

      .dialog-danger .dialog-icon {
        color: #ff1744;
        text-shadow: 2px 2px 0px rgba(213, 0, 0, 0.5);
      }

      .dialog-info .dialog-icon {
        color: #2979ff;
        text-shadow: 2px 2px 0px rgba(13, 71, 161, 0.5);
      }

      h2 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #1a237e;
      }

      .dialog-message {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #424242;
        margin: 0;
        font-weight: 500;
        padding: 16px;
        background: rgba(255, 249, 196, 0.3);
        border-radius: 12px;
        border-left: 4px solid #ffd600;
      }

      mat-dialog-actions {
        padding: 24px 0 0 0;
        margin: 0;
        gap: 16px;
        display: flex;
        justify-content: center;
      }

      mat-dialog-actions button {
        min-width: 140px;
        height: 50px;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 1px !important;
        border-radius: 12px !important;
        border: 3px solid transparent !important;
        transition: all 0.2s ease !important;
        position: relative;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px;
      }

      /* Botão Cancelar - Estilo Comic */
      .btn-cancel {
        background: white !important;
        color: #424242 !important;
        border-color: rgba(0, 0, 0, 0.3) !important;
        box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2) !important;
      }

      .btn-cancel:hover {
        transform: translateY(1px);
        box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2) !important;
        background: #f5f5f5 !important;
      }

      .btn-cancel mat-icon {
        color: #424242 !important;
      }

      /* Botão Confirmar - Estilo Comic */
      .btn-confirm {
        color: white !important;
      }

      .btn-confirm mat-icon {
        font-size: 22px;
        width: 22px;
        height: 22px;
      }

      /* Estilo Warning (Amarelo) */
      .btn-warning {
        background: #ffd600 !important;
        color: #1a237e !important;
        border-color: #f57f17 !important;
        box-shadow: 0 4px 0 #f57f17 !important;
      }

      .btn-warning:hover {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #f57f17 !important;
      }

      .btn-warning mat-icon {
        color: #1a237e !important;
      }

      /* Estilo Danger (Vermelho) */
      .btn-danger {
        background: #ff1744 !important;
        color: white !important;
        border-color: #b71c1c !important;
        box-shadow: 0 4px 0 #b71c1c !important;
      }

      .btn-danger:hover {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #b71c1c !important;
      }

      .btn-danger mat-icon {
        color: white !important;
      }

      /* Estilo Info (Azul) */
      .btn-info {
        background: #2979ff !important;
        color: white !important;
        border-color: #0d47a1 !important;
        box-shadow: 0 4px 0 #0d47a1 !important;
      }

      .btn-info:hover {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #0d47a1 !important;
      }

      .btn-info mat-icon {
        color: white !important;
      }

      /* Responsivo */
      @media (max-width: 600px) {
        .confirm-dialog {
          min-width: auto;
          width: 100%;
          padding: 20px;
        }

        .dialog-header {
          gap: 16px;
        }

        .dialog-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
        }

        h2 {
          font-size: 1.4rem;
        }

        .dialog-message {
          font-size: 1rem;
          padding: 12px;
        }

        mat-dialog-actions {
          flex-direction: column-reverse;
          gap: 12px;
        }

        mat-dialog-actions button {
          width: 100%;
          min-width: 100%;
        }
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // Define tipo padrão como 'warning'
    if (!this.data.type) {
      this.data.type = 'warning';
    }
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'danger':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'help';
    }
  }

  getConfirmIcon(): string {
    switch (this.data.type) {
      case 'danger':
        return 'delete_forever';
      case 'warning':
        return 'check';
      case 'info':
        return 'check_circle';
      default:
        return 'check';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

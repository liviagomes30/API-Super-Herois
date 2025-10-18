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
      .confirm-dialog {
        min-width: 400px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 16px;
      }

      .dialog-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
      }

      .dialog-warning .dialog-icon {
        color: #ff9800;
      }

      .dialog-danger .dialog-icon {
        color: #f44336;
      }

      .dialog-info .dialog-icon {
        color: #2196f3;
      }

      h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
      }

      .dialog-message {
        font-size: 1rem;
        line-height: 1.6;
        color: rgba(0, 0, 0, 0.7);
        margin: 0;
      }

      mat-dialog-actions {
        padding: 16px 0 0 0;
        margin: 0;
        gap: 12px;
      }

      mat-dialog-actions button {
        min-width: 100px;
        height: 42px;
        font-weight: 600;
        border-radius: 24px;
        transition: all 0.3s ease;
      }

      .btn-cancel {
        color: rgba(0, 0, 0, 0.6) !important;
      }

      .btn-cancel:hover {
        background-color: rgba(0, 0, 0, 0.04) !important;
      }

      .btn-confirm {
        color: white !important;
      }

      .btn-confirm mat-icon {
        margin-right: 8px;
      }

      .btn-warning {
        background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%) !important;
        box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3) !important;
      }

      .btn-warning:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(255, 152, 0, 0.4) !important;
      }

      .btn-danger {
        background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%) !important;
        box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3) !important;
      }

      .btn-danger:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(244, 67, 54, 0.4) !important;
      }

      .btn-info {
        background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%) !important;
        box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3) !important;
      }

      .btn-info:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(33, 150, 243, 0.4) !important;
      }

      @media (max-width: 600px) {
        .confirm-dialog {
          min-width: auto;
          width: 100%;
        }

        mat-dialog-actions {
          flex-direction: column-reverse;
        }

        mat-dialog-actions button {
          width: 100%;
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

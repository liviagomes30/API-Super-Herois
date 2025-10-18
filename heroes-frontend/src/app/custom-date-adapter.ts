import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: string | number | Date): Date | null {
    // Se já é uma data, retorna
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const str = value.trim();

      if (!str) {
        return null;
      }

      // Formato DD/MM/YYYY ou DD/MM/YY
      const parts = str.split('/');

      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);

        // Se ano com 2 dígitos, assume século correto
        if (year < 100) {
          // Se ano <= ano atual (últimos 2 dígitos), assume 20xx
          // Caso contrário, assume 19xx
          const currentYear = new Date().getFullYear();
          const currentYearShort = currentYear % 100;

          if (year <= currentYearShort + 10) {
            year += 2000;
          } else {
            year += 1900;
          }
        }

        // Valida se é uma data válida
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          // Valida ranges básicos
          if (month < 1 || month > 12) {
            return null;
          }

          if (day < 1 || day > 31) {
            return null;
          }

          // JavaScript usa mês base 0 (0 = Janeiro)
          const date = new Date(year, month - 1, day);

          // Zera as horas para evitar problemas de timezone
          date.setHours(0, 0, 0, 0);

          // Verifica se a data criada corresponde aos valores inseridos
          // Isso valida automaticamente dias inválidos como 30/02
          if (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
          ) {
            return date;
          }
        }
      }
    }

    if (typeof value === 'number') {
      return new Date(value);
    }

    return null;
  }

  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Formata com zero à esquerda
    const dayStr = day < 10 ? '0' + day : day;
    const monthStr = month < 10 ? '0' + month : month;

    return `${dayStr}/${monthStr}/${year}`;
  }

  // Primeiro dia da semana: Domingo (0)
  override getFirstDayOfWeek(): number {
    return 0;
  }

  // Nomes dos dias da semana
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    }
    if (style === 'short') {
      return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    }
    return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  }

  // Nomes dos meses
  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'long') {
      return [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
    }
    if (style === 'short') {
      return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    }
    return ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  }
}

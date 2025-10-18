// define a logica e a estrutura do componente principal App

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// define metadados
@Component({
  // seletor CSS que será usado para instanciar este componente no HTML
  selector: 'app-root',
  imports: [RouterOutlet], // atua como um placeholder para componentes carregados via roteamento
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('heroes-frontend');
}

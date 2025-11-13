import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  // Textos
  titulo = input.required<string>();
  subtitle = input<string>('Sabor auténtico');
  
  // Imagen (Nueva funcionalidad)
  logoUrl = input<string>(); // Opcional. Si viene, se usa imagen. Si no, icono.
  iconClass = input<string>('bi-circle-fill'); 

  // Horarios Configurables 
  lunchOpenHour = input<number>(13);  // 13:00
  lunchCloseHour = input<number>(16); // 16:00
  dinnerOpenHour = input<number>(20); // 20:00
  dinnerCloseHour = input<number>(24); // 24:00 / 00:00

  // Estado de la tienda
  shopStatus = signal<{isOpen: boolean, message: string, color: string}>({
    isOpen: false,
    message: 'Calculando...',
    color: 'text-secondary'
  });

  constructor() {
    this.checkStatus();
    setInterval(() => this.checkStatus(), 60000);
  }

  private checkStatus() {
    const now = new Date();
    const hour = now.getHours();

    // Usamos los inputs() para la lógica
    const isLunch = hour >= this.lunchOpenHour() && hour < this.lunchCloseHour();
    const isDinner = hour >= this.dinnerOpenHour() && hour < this.dinnerCloseHour();

    if (isLunch || isDinner) {
      // ABIERTO
      // Calculamos la hora de cierre dinámica
      const closeTime = isLunch ? `${this.lunchCloseHour()}:00` : '00:00';
      
      this.shopStatus.set({
        isOpen: true,
        message: `ABIERTO • Cierra a las ${closeTime}`,
        color: 'text-success border-success-subtle bg-success-subtle'
      });
    } else {
      // CERRADO - Calcular próxima apertura dinámica
      let nextOpen = '';
      if (hour < this.lunchOpenHour()) {
        nextOpen = `${this.lunchOpenHour()}:00`;
      } else if (hour < this.dinnerOpenHour()) {
        nextOpen = `${this.dinnerOpenHour()}:00`;
      } else {
        nextOpen = `Mañana ${this.lunchOpenHour()}:00`;
      }

      this.shopStatus.set({
        isOpen: false,
        message: `CERRADO • Abre a las ${nextOpen}`,
        color: 'text-danger border-danger-subtle bg-danger-subtle'
      });
    }
  }
}
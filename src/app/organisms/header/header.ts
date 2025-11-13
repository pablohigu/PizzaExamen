import { Component, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  titulo = input.required<string>();
  subtitle = input<string>('Sabor auténtico');
  
  // Logos e Iconos
  pizzaLogoUrl = input<string>(); 
  cuatroVientosLogoUrl = input<string>(); 
  iconClass = input<string>('bi-circle-fill'); 

  // Horarios Configurables (Con valores por defecto)
  lunchOpenHour = input<number>(13);
  lunchCloseHour = input<number>(16);
  dinnerOpenHour = input<number>(20);
  dinnerCloseHour = input<number>(24);

  // --- ESTADO (Reactivo) ---
  shopStatus = signal<{isOpen: boolean, message: string, color: string}>({
    isOpen: false,
    message: 'Calculando...',
    color: 'text-secondary'
  });

  constructor() {
    // Esto "vigila" los inputs. Cuando Angular les asigna el valor real (ej: 12),
    // el effect detecta que checkStatus() los usa y se vuelve a ejecutar automáticamente.
    effect(() => {
      this.checkStatus();
    });

    // Mantenemos el intervalo para actualizar si pasa el tiempo (cada minuto)
    setInterval(() => this.checkStatus(), 60000);
  }

  private checkStatus() {
    const now = new Date();
    const hour = now.getHours();

    // Obtenemos el valor actual de las señales
    const lOpen = this.lunchOpenHour();
    const lClose = this.lunchCloseHour();
    const dOpen = this.dinnerOpenHour();
    const dClose = this.dinnerCloseHour();

    const isLunch = hour >= lOpen && hour < lClose;
    const isDinner = hour >= dOpen && hour < dClose;

    if (isLunch || isDinner) {
      // Calculamos hora de cierre para mostrar
      const closeTime = isLunch ? `${lClose}:00` : (dClose === 24 ? '00:00' : `${dClose}:00`);
      
      this.shopStatus.set({
        isOpen: true,
        message: `ABIERTO • Cierra a las ${closeTime}`,
        color: 'text-success border-success-subtle bg-success-subtle'
      });
    } else {
      // Calculamos próxima apertura
      let nextOpen = '';
      if (hour < lOpen) {
        nextOpen = `${lOpen}:00`;
      } else if (hour < dOpen) {
        nextOpen = `${dOpen}:00`;
      } else {
        nextOpen = `Mañana ${lOpen}:00`;
      }

      this.shopStatus.set({
        isOpen: false,
        message: `CERRADO • Abre a las ${nextOpen}`,
        color: 'text-danger border-danger-subtle bg-danger-subtle'
      });
    }
  }
}
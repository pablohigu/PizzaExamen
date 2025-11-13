import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.scss'
})
export class CheckoutFormComponent {
  private fb = inject(FormBuilder);
  public service = inject(PizzaService);
  
  resetRequest = output<void>();
  
  // Variable para controlar la visibilidad del modal
  showModal = false;

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      hora: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      direccion: ['', Validators.required],
      metodo: ['tarjeta', Validators.required],
      // Inicialización: Tarjeta activa (requerida), Teléfono desactivado
      tarjeta: [{value: '', disabled: false}, [Validators.required, Validators.pattern(/^\d{16}$/)]],
      telefono: [{value: '', disabled: true}]
    });

    this.form.get('metodo')?.valueChanges.subscribe(val => {
      this.toggleInputs(val);
    });
  }

  private toggleInputs(metodo: string) {
    const tCtrl = this.form.get('tarjeta');
    const mCtrl = this.form.get('telefono');

    if (metodo === 'tarjeta') {
      // Activar Tarjeta
      tCtrl?.enable();
      tCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      
      // Desactivar Bizum
      mCtrl?.disable();
      mCtrl?.clearValidators();
      mCtrl?.setValue(''); 
    } else {
      // Activar Bizum
      mCtrl?.enable();
      mCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      
      // Desactivar Tarjeta
      tCtrl?.disable();
      tCtrl?.clearValidators();
      tCtrl?.setValue('');
    }
    tCtrl?.updateValueAndValidity();
    mCtrl?.updateValueAndValidity();
  }

  pagar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.service.totalPrice() === 0) {
      alert('El carrito está vacío.');
      return;
    }
    
    // MOSTRAR MODAL en lugar de alert
    this.showModal = true;
  }

  // Función llamada desde el botón del modal
  confirmarPedido() {
    this.showModal = false; // Cerrar modal
    this.limpiar();         // Limpiar datos
  }

  limpiar() {
    this.service.clearCart();
    this.form.reset({ metodo: 'tarjeta' });
    this.toggleInputs('tarjeta'); // Resetear lógica inputs
    this.resetRequest.emit(); 
  }

  get isTarjeta() { return this.form.get('metodo')?.value === 'tarjeta'; }
  get isBizum() { return this.form.get('metodo')?.value === 'bizum'; }
}
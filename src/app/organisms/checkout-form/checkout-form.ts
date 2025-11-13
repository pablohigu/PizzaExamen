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

  form: FormGroup;
  
  // NUEVO: Control del Modal
  showModal = false;

  constructor() {
    this.form = this.fb.group({
      hora: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      direccion: ['', Validators.required],
      metodo: ['tarjeta', Validators.required],
      tarjeta: [''],
      telefono: ['']
    });

    this.form.get('metodo')?.valueChanges.subscribe(val => {
      this.updateValidators(val);
    });
    this.updateValidators('tarjeta');
  }

  private updateValidators(metodo: string) {
    const tCtrl = this.form.get('tarjeta');
    const mCtrl = this.form.get('telefono');

    if (metodo === 'tarjeta') {
      tCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      mCtrl?.clearValidators();
      mCtrl?.setValue(''); 
    } else {
      mCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      tCtrl?.clearValidators();
      tCtrl?.setValue('');
    }
    tCtrl?.updateValueAndValidity();
    mCtrl?.updateValueAndValidity();
  }

  // PASO 1: Validar y Abrir Modal
  pagar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.service.totalPrice() === 0) {
      alert('¡Tu carrito está vacío! Añade alguna pizza.');
      return;
    }
    
    // Si todo está bien, mostramos el modal en lugar del alert
    this.showModal = true;
  }

  // PASO 2: Confirmar definitivamente
  confirmarPedido() {
    this.showModal = false; // Cerrar modal
    this.limpiar();         // Limpiar datos
  }

  limpiar() {
    this.service.clearCart();
    this.form.reset({ metodo: 'tarjeta' });
    this.updateValidators('tarjeta');
    this.resetRequest.emit(); 
  }

  get isTarjeta() { return this.form.get('metodo')?.value === 'tarjeta'; }
  get isBizum() { return this.form.get('metodo')?.value === 'bizum'; }
}
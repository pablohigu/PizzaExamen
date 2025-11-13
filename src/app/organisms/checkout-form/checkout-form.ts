import { Component, inject, output } from '@angular/core'; // <--- IMPORTANTE: 'output'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PizzaService } from '../../services/pizza';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.scss'
})
export class CheckoutFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(PizzaService);
  
  // DEFINICIÓN DEL OUTPUT (El nombre 'resetRequest' es clave)
  resetRequest = output<void>(); 

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      hora: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      direccion: ['', Validators.required],
      metodo: ['tarjeta', Validators.required],
      tarjeta: [''],
      telefono: ['']
    });

    this.form.get('metodo')?.valueChanges.subscribe(val => {
      const tCtrl = this.form.get('tarjeta');
      const mCtrl = this.form.get('telefono');

      if (val === 'tarjeta') {
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
    });
    this.form.get('metodo')?.updateValueAndValidity();
  }

  pagar() {
    if (this.form.valid && this.service.totalPrice() > 0) {
      alert('¡Pago realizado con éxito! Gracias por tu compra.');
      this.limpiar();
    } else {
      this.form.markAllAsTouched();
    }
  }

  limpiar() {
    this.service.clearCart();
    this.form.reset({ metodo: 'tarjeta' });
    // EMITIMOS EL EVENTO
    this.resetRequest.emit(); 
  }

  get isTarjeta() { return this.form.get('metodo')?.value === 'tarjeta'; }
  get isBizum() { return this.form.get('metodo')?.value === 'bizum'; }
}
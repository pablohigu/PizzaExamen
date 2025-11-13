import { Component, inject } from '@angular/core';
import { PizzaCardComponent } from '../../molecules/pizza-card/pizza-card';
import { PizzaService } from '../../services/pizza';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [PizzaCardComponent],
  templateUrl: './pizza-list.html',
  styleUrl: './pizza-list.scss'
})
export class PizzaListComponent {
  service = inject(PizzaService);
}
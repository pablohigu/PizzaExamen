import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  title = '4V-PIZZA';
}

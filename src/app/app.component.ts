import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RentalCalculatorComponent } from "./rental-calculator/rental-calculator.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RentalCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rental-app';
}

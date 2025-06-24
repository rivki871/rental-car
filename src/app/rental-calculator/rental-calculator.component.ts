import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Car {
  company: string;
  name: string;
  hourlyRate: number;
  dailyRate?: number;
  dailykmRate?: number;
  hourlykmRate: number;
}

interface CarWithCost extends Car {
  cost: number;
  type: 'שעתי' | 'יומי';
}

@Component({
  selector: 'app-rental-calculator',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './rental-calculator.component.html',
  styleUrl: './rental-calculator.component.scss'
})
export class RentalCalculatorComponent {
  kilometers!:number;
  hours!: number;
  result: CarWithCost[] = [];
  showGreeting = false;
  highlightedIndex = 0;

  cars: Car[] = [
    { company: 'סיטי קאר', name: 'חשמלי', hourlyRate: 21, hourlykmRate: 0.8, dailyRate: 199, dailykmRate: 0.65 },
    { company: 'סיטי קאר', name: 'מיקרה', hourlyRate: 12.2, hourlykmRate: 2.3, dailyRate: 99, dailykmRate: 1 },
    { company: 'מיי קאר', name: 'חשמלי', hourlyRate: 15.9, hourlykmRate: 0.9 },
    { company: 'מיי קאר', name: 'פיקנטו', hourlyRate: 12.9, hourlykmRate: 1.5 },
  ];

  calculate() {
    const prices: CarWithCost[] = this.cars.map(car => {
      const hourlyCost = (car.hourlyRate * this.hours) + (car.hourlykmRate * this.kilometers);
      let dailyCost = Infinity;
      if (car.dailyRate && car.dailykmRate) {
        dailyCost = car.dailyRate + (car.dailykmRate * this.kilometers);
      }
      const bestCost = Math.min(hourlyCost, dailyCost);
      return {
        ...car,
        cost: bestCost,
        type: bestCost === hourlyCost ? 'שעתי' : 'יומי'
      };
    });

    prices.sort((a, b) => a.cost - b.cost);
    this.result = prices
    this.showGreeting = true;
    this.highlightedIndex = 0;
    setTimeout(() => this.highlightedIndex = 0, 50); // יפעיל מחדש את האנימציה
  }
}
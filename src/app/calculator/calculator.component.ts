import { Component } from '@angular/core';
import { StringService } from '../string.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  inputString: string = '';
  result: number | string = '';
  errorMessage: string = '';
  resultMessage: string = '';

  constructor(private stringservice:StringService){}


 
  
  calculate() {
    try {
      this.result = this.stringservice.add(this.inputString);
      this.errorMessage = ''; 
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message; 
      } else {
        this.errorMessage = 'An unknown error occurred'; 
      this.result = ''; 
    }
  }
  
  
}
}

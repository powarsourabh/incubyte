import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  add(numbers: string): number {
    console.log('Input:', numbers); 
  
    if (!numbers || numbers.trim() === "") {
      console.log('Empty input detected, returning 0');
      return 0;
    }
  
    numbers = numbers.replace(/['"]+/g, '');
  
    let delimiters = /,|\n/;  
    let numbersToProcess = numbers;
    const negatives: number[] = []; 
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      if (delimiterEndIndex !== -1) {
        let delimiterPart = numbers.substring(2, delimiterEndIndex);
  
        const delimiterRegex = /\[(.*?)\]/g;
        let customDelimiters: string[] = [];
        let match;
  
        while ((match = delimiterRegex.exec(delimiterPart)) !== null) {
          customDelimiters.push(match[1]);
        }
  
        if (customDelimiters.length === 0) {
          customDelimiters.push(delimiterPart);  
        }
  
        customDelimiters = customDelimiters.map(delimiter => delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        delimiters = new RegExp(customDelimiters.join('|'));  
  
        numbersToProcess = numbers.substring(delimiterEndIndex + 1).trim();
      }
    }
  
    console.log('Delimiters being used:', delimiters);
    console.log('Numbers to process:', numbersToProcess);
  
    const numArray = numbersToProcess.split(delimiters).map(n => parseInt(n, 10));
  
    console.log('Split numbers:', numArray);
  
    const filteredNumArray = numArray.filter(num => {
      if (num < 0) {
        negatives.push(num); 
      }
      return num <= 1000;
    });
  
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }
  
    const sum = filteredNumArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
    console.log('Final sum:', sum);
    return sum;
  }
  

  
  
}
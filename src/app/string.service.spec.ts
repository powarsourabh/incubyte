import { TestBed } from '@angular/core/testing';
import { StringService } from './string.service';

describe('StringService', () => {
  let service: StringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    const result = service.add('');
    expect(result).toBe(0);
  });

  it('should return the sum for comma and newline as default delimiters', () => {
    const result = service.add('1,2\n3');
    expect(result).toBe(6);
  });

  it('should handle a single custom delimiter', () => {
    const result = service.add('//;\n1;2;3');
    expect(result).toBe(6);
  });

  it('should handle a multi-character custom delimiter', () => {
    const result = service.add('//[***]\n1***2***3');
    expect(result).toBe(6);
  });

  it('should handle multiple custom delimiters', () => {
    const result = service.add('//[*][%]\n1*2%3');
    expect(result).toBe(6);
  });

  it('should throw an error if negative numbers are passed', () => {
    expect(() => service.add('1,-2,3')).toThrow(new Error('Negatives not allowed: -2'));
  });

  it('should throw an error with all negative numbers listed', () => {
    expect(() => service.add('1,-2,-3,4')).toThrow(new Error('Negatives not allowed: -2, -3'));
  });

  it('should ignore numbers greater than 1000', () => {
    const result = service.add('2,1001,6');
    expect(result).toBe(8);
  });

  it('should handle custom delimiter with numbers greater than 1000', () => {
    const result = service.add('//;\n2;1001;6');
    expect(result).toBe(8);
  });

  it('should return 0 if only delimiters and no numbers are provided', () => {
    const result = service.add('//;\n;;;');
    expect(result).toBe(0);
  });
});

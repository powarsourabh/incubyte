import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { CalculatorComponent } from './calculator.component';
import { StringService } from '../string.service';
import { By } from '@angular/platform-browser'; 
describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let stringService: jasmine.SpyObj<StringService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('StringService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [FormsModule], 
      providers: [
        { provide: StringService, useValue: spy }, 
      ],
    }).compileComponents();

    stringService = TestBed.inject(StringService) as jasmine.SpyObj<StringService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('String Calculator');
  });

  it('should call StringService.add() when calculate() is triggered', () => {
    component.inputString = '1,2,3';
    stringService.add.and.returnValue(6);

    component.calculate();

    expect(stringService.add).toHaveBeenCalledWith('1,2,3');
    expect(component.result).toBe(6);
    expect(component.errorMessage).toBe('');
  });

  it('should display the result when calculation is successful', () => {
    component.inputString = '1,2,3';
    stringService.add.and.returnValue(6);

    component.calculate();
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.result-container h3')?.textContent).toContain('6');
    expect(component.errorMessage).toBe('');
  });

  it('should display an error message if StringService.add() throws an error', () => {
    component.inputString = '1,-2,3';
    const error = new Error('Negatives not allowed: -2');
    stringService.add.and.throwError(error);

    component.calculate();
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.errorMessage).toBe('Negatives not allowed: -2');
    expect(compiled.querySelector('.alert.alert-danger')?.textContent).toContain('Negatives not allowed: -2');
    expect(component.result).toBe('');
  });

 

  it('should handle unknown errors gracefully', () => {
    component.inputString = '1,2,3';
  
    stringService.add.and.callFake(() => { throw 'Unknown error'; });
  
    component.calculate();
    fixture.detectChanges(); 
  
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.errorMessage).toBe('An unknown error occurred');
    expect(compiled.querySelector('.alert.alert-danger')?.textContent).toContain('An unknown error occurred');
    expect(component.result).toBe('');
  });
  
});

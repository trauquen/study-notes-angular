import { FormControl } from '@angular/forms';
import { reservedNameValidator } from './reserved-name.directive';

describe('ReservedNameDirective', () => {
  const input: FormControl = new FormControl('', reservedNameValidator());

  it('should return false', () => {
    input.patchValue('Hunter');
    expect(input.hasError('reservedName')).toBeTrue();
  });

  it('should return true', () => {
    input.patchValue('Hun');
    expect(input.hasError('reservedName')).toBeFalse();
  });
});

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { differenceInYears, isAfter, parseISO } from 'date-fns';

export const validateDOB = (ctrl: AbstractControl): ValidationErrors | null => {
  const val = ctrl.value;
  if (!val || val === '') {
    return { required: true };
  }

  const now = new Date();
  const date = parseISO(val);
  if (Math.abs(differenceInYears(now, date)) < 18) {
    return { invalid: true };
  }

  if (isAfter(date, now)) {
    return { invalid: true };
  }

  return null;
};

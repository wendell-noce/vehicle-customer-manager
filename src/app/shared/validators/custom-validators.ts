import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  static cpf(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/\D/g, '');
    if (!cpf) return null;

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return { invalidCpf: true };

    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return { invalidCpf: true };

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return { invalidCpf: true };

    return null;
  }

  static carPlate(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.toUpperCase().replace(/[- ]/g, ''); // Remove hífen e espaços
    if (!value) return null;
    const plateRegex = /^[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}$/;

    return plateRegex.test(value) ? null : { invalidPlate: true };
  }
}

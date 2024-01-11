import {FormControl, ValidationErrors} from "@angular/forms";

export class WideBuyValidators {
  static noWhitespaceValidator(control: FormControl): ValidationErrors|null {
    return (control.value || '').trim().length? null : { 'whitespace': true };
  }
}

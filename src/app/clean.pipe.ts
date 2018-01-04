import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clean'
})
export class CleanPipe implements PipeTransform {

  transform(value: string, ...args): string {
      const censor = '$%#@!';
      for (let badWorld of args) {
        if (value.indexOf(badWorld) !== -1) {
          value = value.replace(badWorld, censor);
        }
      }
      return value;
  }

}

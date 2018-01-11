import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: string, fallback: string, forceHttps?: boolean): string {
    let image = '';
    if (value) {
      image = value;
    } else {
      image = fallback;
    }
    if (forceHttps) {
      if (image.indexOf('https') === -1) {
        image = image.replace('http', 'https');
      }
    }
    return image;
  }

}

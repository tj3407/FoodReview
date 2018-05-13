import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform<T extends object>(elements: T[], path: string[], order: number): Array<T> {
    if (!elements || !path || !order) {
      return elements;
    }

    return elements.sort((a: T, b: T) => {
        // We go for each property followed by path
        path.forEach(property => {
          a = a[property];
          b = b[property];
        });

        // Order * (-1): We change our order
        return a > b ? order : order * (- 1);
    });
  }

}

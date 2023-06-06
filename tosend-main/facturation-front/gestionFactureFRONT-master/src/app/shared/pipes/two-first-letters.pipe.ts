import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoFirstLetters'
})
export class TwoFirstLettersPipe implements PipeTransform {

  transform(value: string, ...args: any[]): unknown {
    let result : string="";
    const names = value.split(" ")
    for (let i=0; i<names.length; i++){
      names[i] = names[i].charAt(0).toUpperCase().substr(0,1)
      result += names[i];
    }
    return result
  }

}

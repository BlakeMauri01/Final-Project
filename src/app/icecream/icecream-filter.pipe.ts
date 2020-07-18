import { Pipe, PipeTransform } from '@angular/core';
import { Icecream } from './icecream.model';

@Pipe({
  name: 'icecreamsFilter',
  pure: false
})
export class IcecreamsFilterPipe implements PipeTransform {

  transform(icecreams: Icecream[], term: string): any{
    let filteredIcecreams: Icecream[] = [];

    if(term && term.length > 0){

    filteredIcecreams = icecreams.filter(
      (icecream: any) => icecream.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    return filteredIcecreams.length > 0 ? filteredIcecreams : icecreams;
  }
}

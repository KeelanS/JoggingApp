import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sortRunner"
})
export class RunnerSorter  implements PipeTransform {
  transform(array: any): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
        var aStartNummer = a.startNumber;
        var bStartNummer = b.startNumber;
        var aFinish = a.ranking;
        var bFinish = b.ranking;
        if (aFinish == bFinish) {
          return (aStartNummer < bStartNummer) ? -1 : 1;
        } else {
          if (aFinish == null) 
            return 1;
          if (bFinish == null)
            return -1;
          return (aFinish < bFinish) ? -1 : 1;
        }
    });
    return array;
  }
}
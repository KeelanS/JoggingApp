export class Runner {
  startNumber: number;
  name: string;
  gender: string;
  finish: string;
  race_id: number;

  constructor(startNumber: number,
              name: string,
              gender: string,
              finish: string,
              race_id: number) {
    this.startNumber = startNumber;
    this.name = name;
    this.gender = gender;
    this.finish = finish;
    this.race_id = race_id;
  };

}

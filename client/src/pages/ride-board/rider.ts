export class Rider {

  constructor(
    public id: string,
    public name: string,
    public age: string,
    public place_of_origin: string,
    public origin: string,
    public destination: string,
    public riding_time: string,
    public reputation: string){

      console.log("NEW RIDER", this.id);

    }
}

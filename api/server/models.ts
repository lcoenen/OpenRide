export interface User {

     name: string;
     age: number;
     place_of_origin: string;
     reputation: number;
    
}

export interface Ride {

     driver: string;
     riders: string[];
     origin: string;
     destination: string;
     riding_time: Date;

}

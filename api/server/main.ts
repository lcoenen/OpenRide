import { Meteor } from 'meteor/meteor';
import { Users } from './collections/users';
import { Rides } from './collections/rides';

import * as moment from 'moment';
 
Meteor.startup(() => {
  if(Rides.find({}).cursor.count() === 0) {
   
    console.log('Inserting documents mock');

    let MoeId = Users.collection.insert({
      name: 'Moe',
      age: 22,
      place_of_origin: 'Springfield, USA',
      reputation: 32
    });

    let EricId = Users.collection.insert({
      name: 'Eric',
      age: 42,
      place_of_origin: 'Plouescat, France',
      reputation: 47
    });

    let LouiseId = Users.collection.insert({
      name: 'Louise',
      age: 9,
      place_of_origin: 'Ocean View, NJ',
      reputation: 84
    });


    let MarcId = Users.collection.insert({
      name: 'Marc',
      age: 18,
      place_of_origin: 'Kinshasa, RDC',
      reputation: 88
    });

    let PBId = Users.collection.insert({
      name: 'PB',
      age: 13,
      place_of_origin: 'Candy Castle, Candy Kingdom',
      reputation: 88
    });

    let RickId = Users.collection.insert({
      name: 'Ricke',
      age: 120,
      place_of_origin: '',
      reputation: 12 
    });
  }
});

import { MongoObservable } from 'meteor-rxjs';
import { Ride } from '../models';

export const Rides = new MongoObservable.Collection<Ride>('rides');

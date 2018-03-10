
var chai = require('chai')
	, chaiHttp = require('chai-http');

/* 
 * Both librairies have limited support of ES6 import.
 * See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
 */

chai.use(chaiHttp);

import { expect } from 'chai' ;
import 'mocha';

import { Ride } from '../../shared/models/ride';
import { postDriverExample, postRiderExample } from '../../shared/mocks/ride';

import { resetMock } from '../../shared/bin/resetmock';

const url: string = 'localhost:3000';

describe('matching', () => {

  it("should find the match", () => {

		resetMock().then(() => {

			expect(true).to.be.equal(false);

		}).catch((err) : void => {

		  expect(err).to.equal(undefined)  

		});

  });

});

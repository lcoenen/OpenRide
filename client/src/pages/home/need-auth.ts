import { Injector } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SignInPage } from '../sign-in/sign-in';

import { User } from 'shared/models/user';

/*
 *
 *	This function check if the user is connected. If not, it redirect to the 
 *	SignIn page.
 *
 *	It return a Promise that will be resolved when the user will be logged in. 
 *	If the user cannot log in and just dismiss the modal, the Promise will be broken
 *
 */
 export function identify(userProvider, navCtrl, events) : Promise<any>  {

	// Check that a cookie exists and is recognised by the server
	return userProvider.checkCookie().catch(() => {

		console.log('There is no cookie set (or the cookie is not valid). Opening the modal')

		// If it's not working, return a promise that will
		// resolve when the modal will be closed
		return new Promise((resolve, reject) => {
			
			if(userProvider.me === undefined) {

				navCtrl.push(SignInPage);
				events.subscribe('user:signedIn', (user: User) => {

					user ? resolve() : reject()

				});

			} else { resolve() }	
		
		})

	})

}


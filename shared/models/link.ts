export interface Link {
  '@id': string;
}

export function isLink(x: any) : x is Link {

	return x !== undefined && typeof x['@id'] == 'string';

}

/*
 *
 * This function is extracting the _id from an URL
 *
 * @objectType is the type of a ressource
 *
 * This function will extract the third part of an url in the form
 *
 * /api/ressource/ID[/...]
 *
 */
export function idLink(link: string | Link, objectType?: string) : string {


	let url: string = isLink(link) ? link['@id'] : link;

	let resourceId: string = url.split('/')[3]
	let resourceType: string = url.split('/')[2]

	if(objectType && objectType != resourceType) 
		throw Error(`idLink: this not a ${ objectType }`)

	return resourceId;

}


/* tslint:disable */
/* eslint-disable */
/**
 * SUT SA Example API
 * This is a sample server for SUT SE 2563
 *
 * The version of the OpenAPI document: 1.0
 * Contact: support@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    EntUserEdges,
    EntUserEdgesFromJSON,
    EntUserEdgesFromJSONTyped,
    EntUserEdgesToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntUser
 */
export interface EntUser {
    /**
     * USEREMAIL holds the value of the "USER_EMAIL" field.
     * @type {string}
     * @memberof EntUser
     */
    uSEREMAIL?: string;
    /**
     * USERNAME holds the value of the "USER_NAME" field.
     * @type {string}
     * @memberof EntUser
     */
    uSERNAME?: string;
    /**
     * 
     * @type {EntUserEdges}
     * @memberof EntUser
     */
    edges?: EntUserEdges;
    /**
     * ID of the ent.
     * @type {number}
     * @memberof EntUser
     */
    id?: number;
}

export function EntUserFromJSON(json: any): EntUser {
    return EntUserFromJSONTyped(json, false);
}

export function EntUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uSEREMAIL': !exists(json, 'USER_EMAIL') ? undefined : json['USER_EMAIL'],
        'uSERNAME': !exists(json, 'USER_NAME') ? undefined : json['USER_NAME'],
        'edges': !exists(json, 'edges') ? undefined : EntUserEdgesFromJSON(json['edges']),
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function EntUserToJSON(value?: EntUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'USER_EMAIL': value.uSEREMAIL,
        'USER_NAME': value.uSERNAME,
        'edges': EntUserEdgesToJSON(value.edges),
        'id': value.id,
    };
}



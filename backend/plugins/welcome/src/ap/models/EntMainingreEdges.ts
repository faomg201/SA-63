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
    EntRecordfood,
    EntRecordfoodFromJSON,
    EntRecordfoodFromJSONTyped,
    EntRecordfoodToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntMainingreEdges
 */
export interface EntMainingreEdges {
    /**
     * MAININGRERECORD holds the value of the MAININGRE_RECORD edge.
     * @type {Array<EntRecordfood>}
     * @memberof EntMainingreEdges
     */
    mainingrerecord?: Array<EntRecordfood>;
}

export function EntMainingreEdgesFromJSON(json: any): EntMainingreEdges {
    return EntMainingreEdgesFromJSONTyped(json, false);
}

export function EntMainingreEdgesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntMainingreEdges {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mainingrerecord': !exists(json, 'mainingrerecord') ? undefined : ((json['mainingrerecord'] as Array<any>).map(EntRecordfoodFromJSON)),
    };
}

export function EntMainingreEdgesToJSON(value?: EntMainingreEdges | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mainingrerecord': value.mainingrerecord === undefined ? undefined : ((value.mainingrerecord as Array<any>).map(EntRecordfoodToJSON)),
    };
}



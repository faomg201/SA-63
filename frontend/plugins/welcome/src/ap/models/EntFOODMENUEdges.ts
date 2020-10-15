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
 * @interface EntFOODMENUEdges
 */
export interface EntFOODMENUEdges {
    /**
     * FOODMENURECORD holds the value of the FOODMENURECORD edge.
     * @type {Array<EntRecordfood>}
     * @memberof EntFOODMENUEdges
     */
    foodmenurecord?: Array<EntRecordfood>;
}

export function EntFOODMENUEdgesFromJSON(json: any): EntFOODMENUEdges {
    return EntFOODMENUEdgesFromJSONTyped(json, false);
}

export function EntFOODMENUEdgesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntFOODMENUEdges {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'foodmenurecord': !exists(json, 'foodmenurecord') ? undefined : ((json['foodmenurecord'] as Array<any>).map(EntRecordfoodFromJSON)),
    };
}

export function EntFOODMENUEdgesToJSON(value?: EntFOODMENUEdges | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'foodmenurecord': value.foodmenurecord === undefined ? undefined : ((value.foodmenurecord as Array<any>).map(EntRecordfoodToJSON)),
    };
}



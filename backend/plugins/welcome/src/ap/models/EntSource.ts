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
    EntSourceEdges,
    EntSourceEdgesFromJSON,
    EntSourceEdgesFromJSONTyped,
    EntSourceEdgesToJSON,
} from './';

/**
 * 
 * @export
 * @interface EntSource
 */
export interface EntSource {
    /**
     * SOURCEADDRESS holds the value of the "SOURCE_ADDRESS" field.
     * @type {string}
     * @memberof EntSource
     */
    sOURCEADDRESS?: string;
    /**
     * SOURCENAME holds the value of the "SOURCE_NAME" field.
     * @type {string}
     * @memberof EntSource
     */
    sOURCENAME?: string;
    /**
     * SOURCETLE holds the value of the "SOURCE_TLE" field.
     * @type {string}
     * @memberof EntSource
     */
    sOURCETLE?: string;
    /**
     * 
     * @type {EntSourceEdges}
     * @memberof EntSource
     */
    edges?: EntSourceEdges;
    /**
     * ID of the ent.
     * @type {number}
     * @memberof EntSource
     */
    id?: number;
}

export function EntSourceFromJSON(json: any): EntSource {
    return EntSourceFromJSONTyped(json, false);
}

export function EntSourceFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntSource {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'sOURCEADDRESS': !exists(json, 'SOURCE_ADDRESS') ? undefined : json['SOURCE_ADDRESS'],
        'sOURCENAME': !exists(json, 'SOURCE_NAME') ? undefined : json['SOURCE_NAME'],
        'sOURCETLE': !exists(json, 'SOURCE_TLE') ? undefined : json['SOURCE_TLE'],
        'edges': !exists(json, 'edges') ? undefined : EntSourceEdgesFromJSON(json['edges']),
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function EntSourceToJSON(value?: EntSource | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'SOURCE_ADDRESS': value.sOURCEADDRESS,
        'SOURCE_NAME': value.sOURCENAME,
        'SOURCE_TLE': value.sOURCETLE,
        'edges': EntSourceEdgesToJSON(value.edges),
        'id': value.id,
    };
}



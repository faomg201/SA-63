import { Page, pageTheme, Header, Content, ContentHeader, Link, createPlugin } from '@backstage/core';
import React__default, { useState, useEffect, memo, forwardRef, createElement } from 'react';
import { Link as Link$1 } from 'react-router-dom';
import { makeStyles, withStyles, darken, lighten, createStyles } from '@material-ui/core/styles';
import Table2 from '@material-ui/core/Table';
import TableBody2 from '@material-ui/core/TableBody';
import TableCell2 from '@material-ui/core/TableCell';
import TableContainer2 from '@material-ui/core/TableContainer';
import TableHead2 from '@material-ui/core/TableHead';
import TableRow2 from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button2 from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import { capitalize } from '@material-ui/core/utils';
import Typography from '@material-ui/core/Typography';
import InputLabel2 from '@material-ui/core/InputLabel';
import MenuItem2 from '@material-ui/core/MenuItem';
import Select2 from '@material-ui/core/Select';
import FormControl2 from '@material-ui/core/FormControl';

const BASE_PATH = "http://localhost:8080/api/v1".replace(/\/+$/, "");
const isBlob = (value) => typeof Blob !== "undefined" && value instanceof Blob;
class BaseAPI {
  constructor(configuration = new Configuration()) {
    this.configuration = configuration;
    this.fetchApi = async (url, init) => {
      let fetchParams = {url, init};
      for (const middleware of this.middleware) {
        if (middleware.pre) {
          fetchParams = await middleware.pre({
            fetch: this.fetchApi,
            ...fetchParams
          }) || fetchParams;
        }
      }
      let response = await this.configuration.fetchApi(fetchParams.url, fetchParams.init);
      for (const middleware of this.middleware) {
        if (middleware.post) {
          response = await middleware.post({
            fetch: this.fetchApi,
            url,
            init,
            response: response.clone()
          }) || response;
        }
      }
      return response;
    };
    this.middleware = configuration.middleware;
  }
  withMiddleware(...middlewares) {
    const next = this.clone();
    next.middleware = next.middleware.concat(...middlewares);
    return next;
  }
  withPreMiddleware(...preMiddlewares) {
    const middlewares = preMiddlewares.map((pre) => ({pre}));
    return this.withMiddleware(...middlewares);
  }
  withPostMiddleware(...postMiddlewares) {
    const middlewares = postMiddlewares.map((post) => ({post}));
    return this.withMiddleware(...middlewares);
  }
  async request(context) {
    const {url, init} = this.createFetchParams(context);
    const response = await this.fetchApi(url, init);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response;
  }
  createFetchParams(context) {
    let url = this.configuration.basePath + context.path;
    if (context.query !== void 0 && Object.keys(context.query).length !== 0) {
      url += "?" + this.configuration.queryParamsStringify(context.query);
    }
    const body = typeof FormData !== "undefined" && context.body instanceof FormData || context.body instanceof URLSearchParams || isBlob(context.body) ? context.body : JSON.stringify(context.body);
    const headers = Object.assign({}, this.configuration.headers, context.headers);
    const init = {
      method: context.method,
      headers,
      body,
      credentials: this.configuration.credentials
    };
    return {url, init};
  }
  clone() {
    const constructor = this.constructor;
    const next = new constructor(this.configuration);
    next.middleware = this.middleware.slice();
    return next;
  }
}
class RequiredError extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    this.name = "RequiredError";
  }
}
class Configuration {
  constructor(configuration = {}) {
    this.configuration = configuration;
  }
  get basePath() {
    return this.configuration.basePath != null ? this.configuration.basePath : BASE_PATH;
  }
  get fetchApi() {
    return this.configuration.fetchApi || window.fetch.bind(window);
  }
  get middleware() {
    return this.configuration.middleware || [];
  }
  get queryParamsStringify() {
    return this.configuration.queryParamsStringify || querystring;
  }
  get username() {
    return this.configuration.username;
  }
  get password() {
    return this.configuration.password;
  }
  get apiKey() {
    const apiKey = this.configuration.apiKey;
    if (apiKey) {
      return typeof apiKey === "function" ? apiKey : () => apiKey;
    }
    return void 0;
  }
  get accessToken() {
    const accessToken = this.configuration.accessToken;
    if (accessToken) {
      return typeof accessToken === "function" ? accessToken : () => accessToken;
    }
    return void 0;
  }
  get headers() {
    return this.configuration.headers;
  }
  get credentials() {
    return this.configuration.credentials;
  }
}
function exists(json, key) {
  const value = json[key];
  return value !== null && value !== void 0;
}
function querystring(params, prefix = "") {
  return Object.keys(params).map((key) => {
    const fullKey = prefix + (prefix.length ? `[${key}]` : key);
    const value = params[key];
    if (value instanceof Array) {
      const multiValue = value.map((singleValue) => encodeURIComponent(String(singleValue))).join(`&${encodeURIComponent(fullKey)}=`);
      return `${encodeURIComponent(fullKey)}=${multiValue}`;
    }
    if (value instanceof Object) {
      return querystring(value, fullKey);
    }
    return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
  }).filter((part) => part.length > 0).join("&");
}
class JSONApiResponse {
  constructor(raw, transformer = (jsonValue) => jsonValue) {
    this.raw = raw;
    this.transformer = transformer;
  }
  async value() {
    return this.transformer(await this.raw.json());
  }
}

function ControllersRecordfoodToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    recordFOODMENU: value.recordFOODMENU,
    recordINGREDIENT: value.recordINGREDIENT,
    recordSOURCE: value.recordSOURCE,
    recordUSER: value.recordUSER
  };
}

function EntFOODMENUFromJSON(json) {
  return EntFOODMENUFromJSONTyped(json);
}
function EntFOODMENUFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    fOODMENUNAME: !exists(json, "FOODMENU_NAME") ? void 0 : json["FOODMENU_NAME"],
    edges: !exists(json, "edges") ? void 0 : EntFOODMENUEdgesFromJSON(json["edges"]),
    id: !exists(json, "id") ? void 0 : json["id"]
  };
}
function EntFOODMENUToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    FOODMENU_NAME: value.fOODMENUNAME,
    edges: EntFOODMENUEdgesToJSON(value.edges),
    id: value.id
  };
}

function EntFOODMENUEdgesFromJSON(json) {
  return EntFOODMENUEdgesFromJSONTyped(json);
}
function EntFOODMENUEdgesFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    foodmenurecord: !exists(json, "foodmenurecord") ? void 0 : json["foodmenurecord"].map(EntRecordfoodFromJSON)
  };
}
function EntFOODMENUEdgesToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    foodmenurecord: value.foodmenurecord === void 0 ? void 0 : value.foodmenurecord.map(EntRecordfoodToJSON)
  };
}

function EntMainingreFromJSON(json) {
  return EntMainingreFromJSONTyped(json);
}
function EntMainingreFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    mAININGREDIENTNAME: !exists(json, "MAIN_INGREDIENT_NAME") ? void 0 : json["MAIN_INGREDIENT_NAME"],
    edges: !exists(json, "edges") ? void 0 : EntMainingreEdgesFromJSON(json["edges"]),
    id: !exists(json, "id") ? void 0 : json["id"]
  };
}
function EntMainingreToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    MAIN_INGREDIENT_NAME: value.mAININGREDIENTNAME,
    edges: EntMainingreEdgesToJSON(value.edges),
    id: value.id
  };
}

function EntMainingreEdgesFromJSON(json) {
  return EntMainingreEdgesFromJSONTyped(json);
}
function EntMainingreEdgesFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    mainingrerecord: !exists(json, "mainingrerecord") ? void 0 : json["mainingrerecord"].map(EntRecordfoodFromJSON)
  };
}
function EntMainingreEdgesToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    mainingrerecord: value.mainingrerecord === void 0 ? void 0 : value.mainingrerecord.map(EntRecordfoodToJSON)
  };
}

function EntRecordfoodFromJSON(json) {
  return EntRecordfoodFromJSONTyped(json);
}
function EntRecordfoodFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    edges: !exists(json, "edges") ? void 0 : EntRecordfoodEdgesFromJSON(json["edges"]),
    id: !exists(json, "id") ? void 0 : json["id"]
  };
}
function EntRecordfoodToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    edges: EntRecordfoodEdgesToJSON(value.edges),
    id: value.id
  };
}

function EntRecordfoodEdgesFromJSON(json) {
  return EntRecordfoodEdgesFromJSONTyped(json);
}
function EntRecordfoodEdgesFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    recordfoodmenu: !exists(json, "RECORDFOODMENU") ? void 0 : EntFOODMENUFromJSON(json["RECORDFOODMENU"]),
    recordingredient: !exists(json, "RECORDINGREDIENT") ? void 0 : EntMainingreFromJSON(json["RECORDINGREDIENT"]),
    recordsource: !exists(json, "RECORDSOURCE") ? void 0 : EntSourceFromJSON(json["RECORDSOURCE"]),
    recorduser: !exists(json, "RECORDUSER") ? void 0 : EntUserFromJSON(json["RECORDUSER"])
  };
}
function EntRecordfoodEdgesToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    recordfoodmenu: EntFOODMENUToJSON(value.recordfoodmenu),
    recordingredient: EntMainingreToJSON(value.recordingredient),
    recordsource: EntSourceToJSON(value.recordsource),
    recorduser: EntUserToJSON(value.recorduser)
  };
}

function EntSourceFromJSON(json) {
  return EntSourceFromJSONTyped(json);
}
function EntSourceFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    sOURCEADDRESS: !exists(json, "SOURCE_ADDRESS") ? void 0 : json["SOURCE_ADDRESS"],
    sOURCENAME: !exists(json, "SOURCE_NAME") ? void 0 : json["SOURCE_NAME"],
    sOURCETLE: !exists(json, "SOURCE_TLE") ? void 0 : json["SOURCE_TLE"],
    edges: !exists(json, "edges") ? void 0 : EntSourceEdgesFromJSON(json["edges"]),
    id: !exists(json, "id") ? void 0 : json["id"]
  };
}
function EntSourceToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    SOURCE_ADDRESS: value.sOURCEADDRESS,
    SOURCE_NAME: value.sOURCENAME,
    SOURCE_TLE: value.sOURCETLE,
    edges: EntSourceEdgesToJSON(value.edges),
    id: value.id
  };
}

function EntSourceEdgesFromJSON(json) {
  return EntSourceEdgesFromJSONTyped(json);
}
function EntSourceEdgesFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    sourcerecord: !exists(json, "sourcerecord") ? void 0 : json["sourcerecord"].map(EntRecordfoodFromJSON)
  };
}
function EntSourceEdgesToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    sourcerecord: value.sourcerecord === void 0 ? void 0 : value.sourcerecord.map(EntRecordfoodToJSON)
  };
}

function EntUserFromJSON(json) {
  return EntUserFromJSONTyped(json);
}
function EntUserFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    uSEREMAIL: !exists(json, "USER_EMAIL") ? void 0 : json["USER_EMAIL"],
    uSERNAME: !exists(json, "USER_NAME") ? void 0 : json["USER_NAME"],
    edges: !exists(json, "edges") ? void 0 : EntUserEdgesFromJSON(json["edges"]),
    id: !exists(json, "id") ? void 0 : json["id"]
  };
}
function EntUserToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    USER_EMAIL: value.uSEREMAIL,
    USER_NAME: value.uSERNAME,
    edges: EntUserEdgesToJSON(value.edges),
    id: value.id
  };
}

function EntUserEdgesFromJSON(json) {
  return EntUserEdgesFromJSONTyped(json);
}
function EntUserEdgesFromJSONTyped(json, ignoreDiscriminator) {
  if (json === void 0 || json === null) {
    return json;
  }
  return {
    userrecord: !exists(json, "userrecord") ? void 0 : json["userrecord"].map(EntRecordfoodFromJSON)
  };
}
function EntUserEdgesToJSON(value) {
  if (value === void 0) {
    return void 0;
  }
  if (value === null) {
    return null;
  }
  return {
    userrecord: value.userrecord === void 0 ? void 0 : value.userrecord.map(EntRecordfoodToJSON)
  };
}

class DefaultApi extends BaseAPI {
  async createFoodmenuRaw(requestParameters) {
    if (requestParameters.foodmenu === null || requestParameters.foodmenu === void 0) {
      throw new RequiredError("foodmenu", "Required parameter requestParameters.foodmenu was null or undefined when calling createFoodmenu.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/foodmenus`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: EntFOODMENUToJSON(requestParameters.foodmenu)
    });
    return new JSONApiResponse(response, (jsonValue) => EntFOODMENUFromJSON(jsonValue));
  }
  async createFoodmenu(requestParameters) {
    const response = await this.createFoodmenuRaw(requestParameters);
    return await response.value();
  }
  async createMainingreRaw(requestParameters) {
    if (requestParameters.mainingre === null || requestParameters.mainingre === void 0) {
      throw new RequiredError("mainingre", "Required parameter requestParameters.mainingre was null or undefined when calling createMainingre.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/mainingres`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: EntMainingreToJSON(requestParameters.mainingre)
    });
    return new JSONApiResponse(response, (jsonValue) => EntMainingreFromJSON(jsonValue));
  }
  async createMainingre(requestParameters) {
    const response = await this.createMainingreRaw(requestParameters);
    return await response.value();
  }
  async createRecordfoodRaw(requestParameters) {
    if (requestParameters.recordfood === null || requestParameters.recordfood === void 0) {
      throw new RequiredError("recordfood", "Required parameter requestParameters.recordfood was null or undefined when calling createRecordfood.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/recordfoods`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ControllersRecordfoodToJSON(requestParameters.recordfood)
    });
    return new JSONApiResponse(response, (jsonValue) => EntRecordfoodFromJSON(jsonValue));
  }
  async createRecordfood(requestParameters) {
    const response = await this.createRecordfoodRaw(requestParameters);
    return await response.value();
  }
  async createSourceRaw(requestParameters) {
    if (requestParameters.source === null || requestParameters.source === void 0) {
      throw new RequiredError("source", "Required parameter requestParameters.source was null or undefined when calling createSource.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/sources`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: EntSourceToJSON(requestParameters.source)
    });
    return new JSONApiResponse(response, (jsonValue) => EntSourceFromJSON(jsonValue));
  }
  async createSource(requestParameters) {
    const response = await this.createSourceRaw(requestParameters);
    return await response.value();
  }
  async createUserRaw(requestParameters) {
    if (requestParameters.user === null || requestParameters.user === void 0) {
      throw new RequiredError("user", "Required parameter requestParameters.user was null or undefined when calling createUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/users`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: EntUserToJSON(requestParameters.user)
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async createUser(requestParameters) {
    const response = await this.createUserRaw(requestParameters);
    return await response.value();
  }
  async deleteFoodmenuRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteFoodmenu.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/foodmenus/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteFoodmenu(requestParameters) {
    const response = await this.deleteFoodmenuRaw(requestParameters);
    return await response.value();
  }
  async deleteMainingreRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteMainingre.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/mainingres/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteMainingre(requestParameters) {
    const response = await this.deleteMainingreRaw(requestParameters);
    return await response.value();
  }
  async deleteRecordfoodRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteRecordfood.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/recordfoods/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteRecordfood(requestParameters) {
    const response = await this.deleteRecordfoodRaw(requestParameters);
    return await response.value();
  }
  async deleteSourceRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteSource.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/sources/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteSource(requestParameters) {
    const response = await this.deleteSourceRaw(requestParameters);
    return await response.value();
  }
  async deleteUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling deleteUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response);
  }
  async deleteUser(requestParameters) {
    const response = await this.deleteUserRaw(requestParameters);
    return await response.value();
  }
  async getFoodmenuRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling getFoodmenu.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/foodmenus/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => EntFOODMENUFromJSON(jsonValue));
  }
  async getFoodmenu(requestParameters) {
    const response = await this.getFoodmenuRaw(requestParameters);
    return await response.value();
  }
  async getMainingreRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling getMainingre.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/mainingres/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => EntMainingreFromJSON(jsonValue));
  }
  async getMainingre(requestParameters) {
    const response = await this.getMainingreRaw(requestParameters);
    return await response.value();
  }
  async getSourceRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling getSource.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/sources/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => EntSourceFromJSON(jsonValue));
  }
  async getSource(requestParameters) {
    const response = await this.getSourceRaw(requestParameters);
    return await response.value();
  }
  async getUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling getUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async getUser(requestParameters) {
    const response = await this.getUserRaw(requestParameters);
    return await response.value();
  }
  async listFoodmenuRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/foodmenus`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntFOODMENUFromJSON));
  }
  async listFoodmenu(requestParameters) {
    const response = await this.listFoodmenuRaw(requestParameters);
    return await response.value();
  }
  async listMainingreRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/mainingres`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntMainingreFromJSON));
  }
  async listMainingre(requestParameters) {
    const response = await this.listMainingreRaw(requestParameters);
    return await response.value();
  }
  async listRecordfoodRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/recordfoods`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntRecordfoodFromJSON));
  }
  async listRecordfood(requestParameters) {
    const response = await this.listRecordfoodRaw(requestParameters);
    return await response.value();
  }
  async listSourceRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/sources`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntSourceFromJSON));
  }
  async listSource(requestParameters) {
    const response = await this.listSourceRaw(requestParameters);
    return await response.value();
  }
  async listUserRaw(requestParameters) {
    const queryParameters = {};
    if (requestParameters.limit !== void 0) {
      queryParameters["limit"] = requestParameters.limit;
    }
    if (requestParameters.offset !== void 0) {
      queryParameters["offset"] = requestParameters.offset;
    }
    const headerParameters = {};
    const response = await this.request({
      path: `/users`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });
    return new JSONApiResponse(response, (jsonValue) => jsonValue.map(EntUserFromJSON));
  }
  async listUser(requestParameters) {
    const response = await this.listUserRaw(requestParameters);
    return await response.value();
  }
  async updateFoodmenuRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling updateFoodmenu.");
    }
    if (requestParameters.foodmenu === null || requestParameters.foodmenu === void 0) {
      throw new RequiredError("foodmenu", "Required parameter requestParameters.foodmenu was null or undefined when calling updateFoodmenu.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/foodmenus/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: EntFOODMENUToJSON(requestParameters.foodmenu)
    });
    return new JSONApiResponse(response, (jsonValue) => EntFOODMENUFromJSON(jsonValue));
  }
  async updateFoodmenu(requestParameters) {
    const response = await this.updateFoodmenuRaw(requestParameters);
    return await response.value();
  }
  async updateMainingreRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling updateMainingre.");
    }
    if (requestParameters.mainingre === null || requestParameters.mainingre === void 0) {
      throw new RequiredError("mainingre", "Required parameter requestParameters.mainingre was null or undefined when calling updateMainingre.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/mainingres/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: EntMainingreToJSON(requestParameters.mainingre)
    });
    return new JSONApiResponse(response, (jsonValue) => EntMainingreFromJSON(jsonValue));
  }
  async updateMainingre(requestParameters) {
    const response = await this.updateMainingreRaw(requestParameters);
    return await response.value();
  }
  async updateSourceRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling updateSource.");
    }
    if (requestParameters.source === null || requestParameters.source === void 0) {
      throw new RequiredError("source", "Required parameter requestParameters.source was null or undefined when calling updateSource.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/sources/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: EntSourceToJSON(requestParameters.source)
    });
    return new JSONApiResponse(response, (jsonValue) => EntSourceFromJSON(jsonValue));
  }
  async updateSource(requestParameters) {
    const response = await this.updateSourceRaw(requestParameters);
    return await response.value();
  }
  async updateUserRaw(requestParameters) {
    if (requestParameters.id === null || requestParameters.id === void 0) {
      throw new RequiredError("id", "Required parameter requestParameters.id was null or undefined when calling updateUser.");
    }
    if (requestParameters.user === null || requestParameters.user === void 0) {
      throw new RequiredError("user", "Required parameter requestParameters.user was null or undefined when calling updateUser.");
    }
    const queryParameters = {};
    const headerParameters = {};
    headerParameters["Content-Type"] = "application/json";
    const response = await this.request({
      path: `/users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: EntUserToJSON(requestParameters.user)
    });
    return new JSONApiResponse(response, (jsonValue) => EntUserFromJSON(jsonValue));
  }
  async updateUser(requestParameters) {
    const response = await this.updateUserRaw(requestParameters);
    return await response.value();
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function ComponentsTable() {
  const classes = useStyles();
  const api = new DefaultApi();
  const [users, setUsers] = useState(Array);
  const [loading, setLoading] = useState(true);
  const [recordfoods, setRecordfoods] = useState([]);
  useEffect(() => {
    const getRecordfoods = async () => {
      const res = await api.listRecordfood({limit: 10, offset: 0});
      setLoading(false);
      setRecordfoods(res);
    };
    getRecordfoods();
  }, [loading]);
  const deleteRecordfoods = async (id) => {
    const res = await api.deleteRecordfood({id});
    setLoading(true);
  };
  return /* @__PURE__ */ React__default.createElement(TableContainer2, {
    component: Paper
  }, /* @__PURE__ */ React__default.createElement(Table2, {
    className: classes.table,
    "aria-label": "simple table"
  }, /* @__PURE__ */ React__default.createElement(TableHead2, null, /* @__PURE__ */ React__default.createElement(TableRow2, null, /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "Record ID "), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "User Name"), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "ชื่ออาหาร"), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "วัตถุดิหลัก"), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "แหล่งที่มา"), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "ที่อยู่"), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, "เบอร์โทร"))), /* @__PURE__ */ React__default.createElement(TableBody2, null, recordfoods.map((item) => /* @__PURE__ */ React__default.createElement(TableRow2, {
    key: item.id
  }, /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.id), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recorduser.uSERNAME), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recordfoodmenu.fOODMENUNAME), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recordingredient.mAININGREDIENTNAME), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recordsource.sOURCENAME), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recordsource.sOURCEADDRESS), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, item.edges.recordsource.sOURCETLE), /* @__PURE__ */ React__default.createElement(TableCell2, {
    align: "center"
  }, /* @__PURE__ */ React__default.createElement(Button2, {
    onClick: () => {
      deleteRecordfoods(item.id);
    },
    style: {marginLeft: 10},
    variant: "contained",
    color: "secondary"
  }, "Delete")))))));
}

const WelcomePage = () => {
  const profile = {givenName: "ตารางบันทึกแหล่งที่มาของอาหาร"};
  return /* @__PURE__ */ React__default.createElement(Page, {
    theme: pageTheme.home
  }, /* @__PURE__ */ React__default.createElement(Header, {
    title: ` ${profile.givenName }`,
    subtitle: "บอกข้อมูลแหล่งที่มาของอาหาร"
  }), /* @__PURE__ */ React__default.createElement(Content, null, /* @__PURE__ */ React__default.createElement(ContentHeader, {
    title: "Source"
  }, /* @__PURE__ */ React__default.createElement(Link, {
    component: Link$1,
    to: "/user"
  }, /* @__PURE__ */ React__default.createElement(Button2, {
    variant: "contained",
    color: "primary"
  }, "เพิ่มข้อมูล"))), /* @__PURE__ */ React__default.createElement(ComponentsTable, null)));
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

function createSvgIcon(path, displayName) {
  var Component = memo(forwardRef(function (props, ref) {
    return createElement(SvgIcon, _extends({
      ref: ref
    }, props), path);
  }));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = SvgIcon.muiName;
  return Component;
}

/**
 * @ignore - internal component.
 */

var SuccessOutlinedIcon = createSvgIcon(createElement("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), 'SuccessOutlined');

/**
 * @ignore - internal component.
 */

var ReportProblemOutlinedIcon = createSvgIcon(createElement("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), 'ReportProblemOutlined');

/**
 * @ignore - internal component.
 */

var ErrorOutlineIcon = createSvgIcon(createElement("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), 'ErrorOutline');

/**
 * @ignore - internal component.
 */

var InfoOutlinedIcon = createSvgIcon(createElement("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), 'InfoOutlined');

/**
 * @ignore - internal component.
 */

var CloseIcon = createSvgIcon(createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close');

var styles = function styles(theme) {
  var getColor = theme.palette.type === 'light' ? darken : lighten;
  var getBackgroundColor = theme.palette.type === 'light' ? lighten : darken;
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '6px 16px'
    }),

    /* Styles applied to the root element if `variant="standard"` and `color="success"`. */
    standardSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.9),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="info"`. */
    standardInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.info.main, 0.9),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="warning"`. */
    standardWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.warning.main, 0.9),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="standard"` and `color="error"`. */
    standardError: {
      color: getColor(theme.palette.error.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.error.main, 0.9),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="success"`. */
    outlinedSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      border: "1px solid ".concat(theme.palette.success.main),
      '& $icon': {
        color: theme.palette.success.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="info"`. */
    outlinedInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      border: "1px solid ".concat(theme.palette.info.main),
      '& $icon': {
        color: theme.palette.info.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
    outlinedWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      border: "1px solid ".concat(theme.palette.warning.main),
      '& $icon': {
        color: theme.palette.warning.main
      }
    },

    /* Styles applied to the root element if `variant="outlined"` and `color="error"`. */
    outlinedError: {
      color: getColor(theme.palette.error.main, 0.6),
      border: "1px solid ".concat(theme.palette.error.main),
      '& $icon': {
        color: theme.palette.error.main
      }
    },

    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.success.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.info.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.warning.main
    },

    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.error.main
    },

    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: '7px 0',
      display: 'flex',
      fontSize: 22,
      opacity: 0.9
    },

    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8
    }
  };
};
var defaultIconMapping = {
  success: createElement(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: createElement(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: createElement(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: createElement(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};

var _ref = createElement(CloseIcon, {
  fontSize: "small"
});

var Alert = forwardRef(function Alert(props, ref) {
  var action = props.action,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      color = props.color,
      icon = props.icon,
      _props$iconMapping = props.iconMapping,
      iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
      onClose = props.onClose,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      _props$severity = props.severity,
      severity = _props$severity === void 0 ? 'success' : _props$severity,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = _objectWithoutProperties(props, ["action", "children", "classes", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"]);

  return createElement(Paper, _extends({
    role: role,
    square: true,
    elevation: 0,
    className: clsx(classes.root, classes["".concat(variant).concat(capitalize(color || severity))], className),
    ref: ref
  }, other), icon !== false ? createElement("div", {
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, createElement("div", {
    className: classes.message
  }, children), action != null ? createElement("div", {
    className: classes.action
  }, action) : null, action == null && onClose ? createElement("div", {
    className: classes.action
  }, createElement(IconButton, {
    size: "small",
    "aria-label": closeText,
    title: closeText,
    color: "inherit",
    onClick: onClose
  }, _ref)) : null);
});
process.env.NODE_ENV !== "production" ? Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: propTypes.node,

  /**
   * The content of the component.
   */
  children: propTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: propTypes.object,

  /**
   * @ignore
   */
  className: propTypes.string,

  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   */
  closeText: propTypes.string,

  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: propTypes.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: propTypes.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: propTypes.shape({
    error: propTypes.node,
    info: propTypes.node,
    success: propTypes.node,
    warning: propTypes.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: propTypes.func,

  /**
   * The ARIA role attribute of the element.
   */
  role: propTypes.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: propTypes.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * The variant to use.
   */
  variant: propTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
var Alert$1 = withStyles(styles, {
  name: 'MuiAlert'
})(Alert);

const useStyles$1 = makeStyles((theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  margin: {
    margin: theme.spacing(3)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
}));
const initialUserState = {
  name: "Makawan Thojan",
  n: 10
};
function Create() {
  const classes = useStyles$1();
  const profile = {givenName: "บันทึกแหล่งที่มาของอาหาร"};
  const username = {givenuser: "faomg201@gmail.com"};
  const api = new DefaultApi();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(initialUserState);
  const [foodmenus, setFOODMENU] = useState([]);
  const [mainingres, setMainingre] = useState([]);
  const [sources, setSource] = useState([]);
  const [recordfoods, setRec] = useState([]);
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(true);
  const [foodmenuid, setFOODMENUID] = useState(Number);
  const [mainingreid, setMainingreID] = useState(Number);
  const [sourceid, setSourceID] = useState(Number);
  useEffect(() => {
    const getFOODMENU = async () => {
      const res = await api.listFoodmenu({limit: 10, offset: 0});
      setLoading(false);
      setFOODMENU(res);
    };
    getFOODMENU();
    const getMainingre = async () => {
      const res = await api.listMainingre({limit: 10, offset: 0});
      setLoading(false);
      setMainingre(res);
    };
    getMainingre();
    const getSource = async () => {
      const res = await api.listSource({limit: 10, offset: 0});
      setLoading(false);
      setSource(res);
    };
    getSource();
  }, [loading]);
  const FOODMENUhandleChange = (event) => {
    setFOODMENUID(event.target.value);
  };
  const MainingrehandleChange = (event) => {
    setMainingreID(event.target.value);
  };
  const SourcehandleChange = (event) => {
    setSourceID(event.target.value);
  };
  const CreateRecordfood = async () => {
    const recordfood = {
      recordFOODMENU: foodmenuid,
      recordINGREDIENT: mainingreid,
      recordSOURCE: sourceid,
      recordUSER: 2
    };
    console.log(recordfood);
    const res = await api.createRecordfood({recordfood});
    setStatus(true);
    if (res.id != "") {
      setAlert(true);
    } else {
      setAlert(false);
    }
    const timer = setTimeout(() => {
      setStatus(false);
    }, 1e3);
  };
  return /* @__PURE__ */ React__default.createElement(Page, {
    theme: pageTheme.home
  }, /* @__PURE__ */ React__default.createElement(Header, {
    title: ` ${profile.givenName }`,
    subtitle: ""
  }), /* @__PURE__ */ React__default.createElement(Content, null, /* @__PURE__ */ React__default.createElement(ContentHeader, {
    title: "เพิ่มข้อมูลแหล่งที่มาของอาหาร"
  }, /* @__PURE__ */ React__default.createElement(Typography, {
    align: "left",
    style: {marginRight: 16, color: "#00eeff"}
  }, username.givenuser), /* @__PURE__ */ React__default.createElement(Button2, {
    variant: "contained",
    color: "primary"
  }, "ออกจากระบบ"), status ? /* @__PURE__ */ React__default.createElement("div", null, alert ? /* @__PURE__ */ React__default.createElement(Alert$1, {
    severity: "success"
  }, "บันทึกสำเร็จ") : /* @__PURE__ */ React__default.createElement(Alert$1, {
    severity: "warning",
    style: {marginTop: 20}
  }, "พบปัญหาระหว่างบันทึกข้อมูล")) : null), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.root
  }, /* @__PURE__ */ React__default.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, /* @__PURE__ */ React__default.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React__default.createElement(InputLabel2, {
    id: "foodmenu-label"
  }, "ชื่ออาหาร"), /* @__PURE__ */ React__default.createElement(Select2, {
    labelId: "foodmenu-label",
    id: "foodmenu",
    value: foodmenuid,
    onChange: FOODMENUhandleChange,
    style: {width: 400}
  }, foodmenus.map((item) => /* @__PURE__ */ React__default.createElement(MenuItem2, {
    value: item.id
  }, item.fOODMENUNAME)))), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React__default.createElement(InputLabel2, {
    id: "Mainingre-label"
  }, "ชื่อวัตถุดิบหลักก"), /* @__PURE__ */ React__default.createElement(Select2, {
    labelId: "Mainingre-label",
    id: "mainingre",
    value: mainingreid,
    onChange: MainingrehandleChange,
    style: {width: 400}
  }, mainingres.map((item) => /* @__PURE__ */ React__default.createElement(MenuItem2, {
    value: item.id
  }, item.mAININGREDIENTNAME))))), /* @__PURE__ */ React__default.createElement(FormControl2, {
    className: classes.margin,
    variant: "outlined"
  }, /* @__PURE__ */ React__default.createElement(InputLabel2, {
    id: "Source-label"
  }, "ชื่อร้านอาหาร"), /* @__PURE__ */ React__default.createElement(Select2, {
    labelId: "Source-label",
    id: "source",
    value: sourceid,
    onChange: SourcehandleChange,
    style: {width: 200}
  }, sources.map((item) => /* @__PURE__ */ React__default.createElement(MenuItem2, {
    value: item.id
  }, item.sOURCENAME)))), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.margin
  }, /* @__PURE__ */ React__default.createElement(Button2, {
    onClick: () => {
      CreateRecordfood();
    },
    variant: "contained",
    color: "primary"
  }, "ยืนยัน"), /* @__PURE__ */ React__default.createElement(Button2, {
    style: {marginLeft: 20},
    component: Link$1,
    to: "/",
    variant: "contained"
  }, "กลับ"))))));
}

const plugin = createPlugin({
  id: "welcome",
  register({router}) {
    router.registerRoute("/", WelcomePage);
    router.registerRoute("/user", Create);
  }
});

export { plugin };

import {adaptServerData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `o0`;
const APP_ID = 2732157834;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData(server = `${SERVER_URL}/questions`, options) {
    return fetch(`${server}`, options).then(checkStatus).then(toJSON).then(adaptServerData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}

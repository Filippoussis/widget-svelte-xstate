import SSOApi from './sso';

class Api {
  sso: SSOApi;

  constructor() {
    this.sso = new SSOApi();
  }
}

export default new Api();

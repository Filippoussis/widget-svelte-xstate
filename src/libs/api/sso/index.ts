import { kyInstance } from '../../ky';
import type { SSOResponseSchema } from './interfaces';

class LoginApi {
  async postAccessToken(qsParams: string): Promise<SSOResponseSchema> {
    return await kyInstance
      .post('sso/oauth2/access_token', {
        body: qsParams,
      })
      .json();
  }
}

export default LoginApi;

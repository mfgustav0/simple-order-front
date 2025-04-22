import type { Axios } from 'axios';

export interface AuthGateway {
  register(input: InputRegister): Promise<OutputToken>;

  login(input: InputLogin): Promise<OutputToken>;
}

export class AuthGatewayAxios implements AuthGateway {
  constructor (private readonly httpClient: Axios) {}

  async login (input: InputLogin): Promise<OutputToken> {
    const response = await this.httpClient.post(`/auth/login`, JSON.stringify(input));

    return {
      access_token: response.data.access_token,
    };
  }

  async register (input: InputRegister): Promise<OutputToken> {
    const response = await this.httpClient.post(`/auth/register`, JSON.stringify(input));

    return {
      access_token: response.data.access_token,
    };
  }
}

type InputRegister = {
  name: string;
  email: string;
  password: string;
};

type InputLogin = {
  email: string;
  password: string;
};

type OutputToken = {
  access_token: string;
};

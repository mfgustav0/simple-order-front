import type { Axios } from 'axios';

export interface UserGateway {
  withToken(token: string): UserGateway;

  me(): Promise<OutputMe>;
}

export class UserGatewayAxios implements UserGateway {
  private token: string = '';

  constructor (private readonly httpClient: Axios) {}

  withToken (token: string): UserGateway {
    this.token = token;

    return this;
  }

  async me (): Promise<OutputMe> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.get(`/user/me`, {
      headers,
    });

    return response.data;
  }
}

type OutputMe = {
  id: string;
  name: string;
  email: string;
};

import { useAuthStore } from '@/plugins/vuex';
import type { Axios } from 'axios';

export interface UserGateway {
  me(): Promise<OutputMe>
}

export class UserGatewayAxios implements UserGateway {
  constructor (private readonly httpClient: Axios) {}

  async me (): Promise<OutputMe> {
    const headers: any = {};
    const token = useAuthStore().state.token
    if(token) {
      headers['Authorization'] = 'Bearer ' + token;
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

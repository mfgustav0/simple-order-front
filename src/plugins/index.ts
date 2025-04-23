/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'

// Types
import type { App } from 'vue'

import { ProductGatewayAxios } from '../gateway/product.gateway';
import { AuthGatewayAxios } from '../gateway/auth.gateway';
import axios from '../utils/axios';
import { key, store } from './vuex';
import { UserGatewayAxios } from '@/gateway/user.gateway';
import { OrderGatewayAxios } from '@/gateway/order.gateway';

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(store, key)
    .provide('productGateway', new ProductGatewayAxios(axios))
    .provide('authGateway', new AuthGatewayAxios(axios))
    .provide('userGateway', new UserGatewayAxios(axios))
    .provide('orderGateway', new OrderGatewayAxios(axios))
}

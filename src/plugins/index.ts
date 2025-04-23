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
import { key as AuthKey, store as AuthStore } from './vuex/auth-store';
import { key as OrderKey, store as OrderStore } from './vuex/order-store';
import { UserGatewayAxios } from '@/gateway/user.gateway';
import { OrderGatewayAxios } from '@/gateway/order.gateway';

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(AuthStore, AuthKey)
    .use(OrderStore, OrderKey)
    .provide('productGateway', new ProductGatewayAxios(axios))
    .provide('authGateway', new AuthGatewayAxios(axios))
    .provide('userGateway', new UserGatewayAxios(axios))
    .provide('orderGateway', new OrderGatewayAxios(axios))
}

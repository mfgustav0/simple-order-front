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

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .provide('productGateway', new ProductGatewayAxios(axios))
    .provide('authGateway', new AuthGatewayAxios(axios))
}

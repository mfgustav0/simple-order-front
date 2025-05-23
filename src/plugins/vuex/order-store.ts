import type { Order } from '@/entities/order';
import type { OrderGateway } from '@/gateway/order.gateway';
import { type InjectionKey } from 'vue';
import { type ActionContext, createStore, Store, useStore } from 'vuex';

export interface State {
  initialized: boolean,
  orderId: string | null,
  totalItems: number,
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    initialized: false,
    orderId: null,
    totalItems: 0,
  },
  mutations: {
    initialized (state: State) {
      state.initialized = true;
    },
    updateOrder (state: State, payload: Order | null) {
      state.orderId = payload?.id ?? null;
      state.totalItems = payload?.items?.length ?? 0;
    },
  },
  actions: {
    async init (context: ActionContext<State, State>, orderGateway: OrderGateway) {
      if (context.state.initialized) {
        return;
      }

      await context.dispatch('load', orderGateway);

      context.commit('initialized');
    },
    async load (context: ActionContext<State, State>, orderGateway: OrderGateway) {
      const order = await orderGateway.getCurrentOrder();

      context.commit('updateOrder', order);
    },
  },
  getters: {
    showBadge (state: State) {
      return state.totalItems > 0
    },
  },
});

export function useOrderStore () {
  return useStore(key);
}

import { type InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import Cookies from 'js-cookie';

export interface State {
  initialized: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    initialized: false,
    isAuthenticated: false,
    token: null,
  },
  mutations: {
    initialized (state: State) {
      state.initialized = true;
    },
    setToken (state: State, payload: { token: string | null }) {
      state.token = payload.token;
      state.isAuthenticated = payload.token != null;
    },
  },
  actions: {
    registerToken (context: Store, payload: { token: string }) {
      Cookies.set('token', payload.token);

      context.commit('setToken', payload);
    },
    logout (context: Store) {
      Cookies.remove('token');

      context.commit('setToken', { token: null });
    },
    init (context: Store<State>) {
      if (context.state.initialized) {
        return;
      }

      const token = Cookies.get('token');

      context.commit('setToken', { token });

      context.commit('initialized');
    },
  },
});

export function useAuthStore () {
  return useStore(key);
}

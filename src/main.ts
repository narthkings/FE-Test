import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'

// Cache implementation
const cache = new InMemoryCache()

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://rickandmortyapi.com/graphql',
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
initializeRouter(app)
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions)
app.mount('#app')

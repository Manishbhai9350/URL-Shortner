import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from './routing'
import {Provider} from 'react-redux'
import './main.css'
import AuthStore from './store'

// Create a client
const queryClient = new QueryClient()
const router = createRouter({
  routeTree,
  context:{
    queryClient,
    AuthStore,
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={AuthStore} >
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </Provider>
)

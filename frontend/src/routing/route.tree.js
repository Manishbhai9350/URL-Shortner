import {createRootRoute} from '@tanstack/react-router';
import {HomeRoute} from './home.route'
import App from '../App'
import { AuthRoute } from './auth.route';
import { DashboardRoute } from './dashboard.route';

export const RootRoute = createRootRoute({
    component:App
})

const routeTree = RootRoute.addChildren([
    HomeRoute,
    AuthRoute,
    DashboardRoute
])

export {routeTree}







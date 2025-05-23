import { createRoute } from "@tanstack/react-router"
import { RootRoute } from "./route.tree"
import Dashboard from '../pages/Dashboard'


export const DashboardRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/dashboard',
  component:Dashboard,
  beforeLoad(){
    
  }
})
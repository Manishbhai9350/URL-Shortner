import { createRoute } from "@tanstack/react-router"
import { RootRoute } from "./route.tree"
import Home from '../pages/Home'
import { CheckAuthenticated } from "../api/user.api"


export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component:Home,
  beforeLoad:CheckAuthenticated
})
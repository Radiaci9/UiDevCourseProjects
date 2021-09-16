import * as React from "react"
import { useRouteMatch } from "react-router"
import RouteWithSubRoutes from "./RouteWithSubRoutes"

export default function Routes ({ routes }) {
  const { path } = useRouteMatch();
  console.log('Navbar');
  return (
    <>
    {
      routes.map((route) => (
        <RouteWithSubRoutes key={route.path} pathPrefix={path} {...route} />
      ))
    }
    </>
  )
}

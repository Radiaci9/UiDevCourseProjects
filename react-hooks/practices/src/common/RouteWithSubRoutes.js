import * as React from "react"
import { Route } from "react-router"
import { formatPath } from "./functions"

export default function RouteWithSubRoutes (route) {
  return (
    <Route path={formatPath(`${route.pathPrefix}/${route.path}`)} exact={route.exact}>
      <route.component routes={route.routes} />
    </Route>
  )
}

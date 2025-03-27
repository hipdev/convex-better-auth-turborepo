import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { auth } from '../auth'

const http = httpRouter()

http.route({
  path: '/validate-session',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const session = await auth.api.getSession({
      headers: request.headers
    })

    console.log(session)

    return new Response(null, {
      status: 200
    })
  })
})

export default http

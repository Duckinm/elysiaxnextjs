// import { postController } from '@/server/routes/posts'
import { treaty } from '@elysiajs/eden'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'

const app = new Elysia({ prefix: '/api' }).use(swagger())
// .use(bearer())
// .onBeforeHandle(async ({ bearer, set }) => {
//   if (!bearer) return (set.status = 'Unauthorized')
//   const isAuthorized = bearer === '12345678'
//   if (!isAuthorized) {
//     return (set.status = 'Unauthorized')
//   }
// })
// .use(postController)

export const client = treaty<App>(
  typeof window === 'undefined'
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : window.location.origin
)

export default app

export type App = typeof app

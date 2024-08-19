import { postController } from '@/lib/server/posts'
import { Elysia } from 'elysia'

const app = new Elysia({ prefix: '/api' }).use(postController)

// .use(swagger())
// .use(bearer())
// .onBeforeHandle(async ({ bearer, set }) => {
//   if (!bearer) return (set.status = 'Unauthorized')
//   const isAuthorized = bearer === '12345678'
//   if (!isAuthorized) {
//     return (set.status = 'Unauthorized')
//   }
// })

export type App = typeof app

export const GET = app.handle
export const POST = app.handle
export const PUT = app.handle
export const DELETE = app.handle
export const PATCH = app.handle

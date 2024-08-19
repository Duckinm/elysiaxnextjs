import { Elysia, t } from 'elysia'

import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from './handlers'

const postParams = t.Object({
  id: t.String(),
})

export const postController = new Elysia({ prefix: '/posts' })
  .get('/', () => getPosts())
  .get('/:id', ({ params: { id } }) => getPostById(id), {
    params: postParams,
  })
  .post('/', ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 50,
        error: 'Title must be between 3 and 50 characters',
      }),
      content: t.String({
        minLength: 3,
        maxLength: 50,
        error: 'Title must be between 3 and 50 characters',
      }),
    }),
  })
  .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
    params: postParams,
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
  })
  .delete('/:id', ({ params: { id } }) => deletePost(id), {
    params: postParams,
  })

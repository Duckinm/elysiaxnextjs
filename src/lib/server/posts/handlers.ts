'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { insertPostSchema, posts, type SelectPost } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getPosts() {
  try {
    const posts = db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    })

    return posts
  } catch (error) {
    console.error('Error getting posts:', error)
  }
}

export async function getPostById(id: string) {
  try {
    const post = db.query.posts.findFirst({
      where: eq(posts.id, id),
    })

    return post
  } catch (error) {
    console.error('Error getting post by id:', error)
  }
}

export async function createPost({
  title,
  content,
}: {
  title: string
  content: string
}) {
  try {
    const newPost = insertPostSchema.parse({ title, content })

    const results = await db.insert(posts).values(newPost).returning()

    if (!results || results.length < 1) {
      return console.error('Error creating post:', results)
    }

    revalidatePath('/')

    return results[0]
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

export async function updatePost(
  id: string,
  { title, content }: { title?: string; content?: string }
) {
  try {
    const post = insertPostSchema
      .partial({ title: true, content: true })
      .parse({ title, content })

    const updatedPosts: SelectPost[] = await db
      .update(posts)
      .set(post)
      .where(eq(posts.id, id))
      .returning()

    if (!updatedPosts || updatedPosts.length < 1) {
      return console.error('Error updating post:', updatedPosts)
    }

    return updatedPosts[0]
  } catch (error) {
    console.error('Error updating post:', error)
  }
}

export async function deletePost(id: string) {
  try {
    const deletedPosts = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({ id: posts.id })

    if (!deletedPosts || deletedPosts.length < 1) {
      return console.error('Error deleting post:', deletedPosts)
    }

    return {
      deletedPosts: deletedPosts[0],
    }
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-call */

'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { InsertPost } from '@/db/schema'
import { client } from '@/lib/fetcher'
import { useForm } from 'react-hook-form'

type Schema = Pick<InsertPost, 'title' | 'content'>

export function FormSubmission() {
  const form = useForm<Schema>({
    defaultValues: {
      title: '',
      content: '',
    },
  })

  async function onSubmit(values: Schema) {
    await client.api.posts.post(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex break-inside-avoid flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

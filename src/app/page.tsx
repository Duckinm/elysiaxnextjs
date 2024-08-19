import { FormSubmission } from '@/components/form-submission'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { getPosts } from '@/lib/server/posts/handlers'

export default async function Home() {
  const allPosts = await getPosts()

  return (
    <main className="container mx-auto flex h-screen w-full max-w-xl flex-col space-y-6">
      <div className="my-auto columns-1 md:columns-2">
        <FormSubmission />

        <ScrollArea className="h-[500px] break-inside-avoid rounded-lg bg-gray-100 p-4 text-gray-800">
          <div className="flex flex-col gap-1.5">
            {allPosts?.map((post) => (
              <div key={post.id}>
                <div className="mb-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p>{post.content}</p>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  )
}

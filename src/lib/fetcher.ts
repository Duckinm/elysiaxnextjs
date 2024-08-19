import type { App } from '@/app/api/[[...slugs]]/route'
import { treaty } from '@elysiajs/eden/treaty2'

export const client = treaty<App>('http://localhost:3000')

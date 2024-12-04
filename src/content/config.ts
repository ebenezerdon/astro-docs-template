import { defineCollection, z } from 'astro:content'

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.string().optional(),
    order: z.number().optional(),
    // For components and foundations sections
    category: z.enum(['Overview', 'Foundations', 'Components']).optional(),
  }),
})

export const collections = {
  docs,
}

import z from 'zod'

export const schemaCreateTask = z.object({
  title: z
    .string()
    .min(3, {
      message: 'El título debe tener al menos 3 caracteres'
    })
    .max(100, {
      message: 'El título no puede exceder los 100 caracteres'
    }),

  description: z
    .string()
    .min(10, {
      message: 'La descripción debe tener al menos 10 caracteres'
    })
    .max(1000, {
      message: 'La descripción no puede exceder los 1000 caracteres'
    })
})

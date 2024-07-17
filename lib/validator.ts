import * as z from 'zod'


export const EventFormSchema = z.object({
    title: z.string().min(3,'Username must be at least 3 characters.'),
    description: z.string().min(3,'description must be at least 3 characters.').max(400,'description must be less than 400'),
    location:z.string().min(3,'location must be at least 3 characters').max(400,'locations must be less than 400'),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url: z.string().url()
  })

  export const CompaignFormSchema = z.object({
    title: z.string().min(3,'Title must be at least 3 characters.'),
    description: z.string().min(3,'description must be at least 3 characters.').max(400,'description must be less than 400'),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    comCategoryId:z.string(),
    isZakatEligible:z.boolean(),
    goal:z.string()
  })

import * as z from 'zod'

export const ComboValadtion = z.object({
    createdBy: z.string().min(-1),
    moves: z.string().min(-1),
    file: z.string().min(-1),
    isTrue: z.boolean(),
    doesKill: z.boolean(),
    notes: z.string().min(-1),
    startingPercent: z.coerce.number()
})
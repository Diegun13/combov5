import * as z from 'zod'

export const ComboValadtion = z.object({
    moves: z.string().min(-1),
    file: z.string().min(-1),
    isTrue: z.coerce.boolean(),
    notes: z.string().min(-1),
    doesKill: z.coerce.boolean(),
    startingPercent: z.coerce.number()
})
import * as z from 'zod'

export const ComboValadtion = z.object({
    moves: z.string().min(-1),
    file: z.string().min(-1),
    isTrue: z.boolean(),
    notes: z.string().min(-1),
    doesKill: z.boolean(),
    startingPercent: z.number().int().positive()
})
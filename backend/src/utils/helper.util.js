import { nanoid } from "nanoid"



export const GenerateUrl = (l = 7) => {
    return nanoid(l)
}
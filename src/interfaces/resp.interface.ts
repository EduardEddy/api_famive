import { UserInterface } from "./user.interface"

export interface RespInterface {
    status: number
    message?: String,
    data?: object|null
}

export interface loginRespInterface {
    status: number
    message?: String
    data?: loginInterface
}

interface loginInterface {
    user: UserInterface
    token?: string
}
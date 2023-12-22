export { }
interface UserToken {
    id:number,
    role: string,
    is_active: boolean,
}
export interface TokenDecored{
    id:number,
    role: string,
    is_active: boolean,
    user_token: string | userToken
}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecored
        }
    }
}


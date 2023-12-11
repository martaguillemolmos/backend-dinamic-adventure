export { }

export interface TokenDecored{
    id:number,
    role: string,
    is_active: boolean
}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecored
        }
    }
}


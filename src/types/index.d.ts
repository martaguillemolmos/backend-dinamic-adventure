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
            //token: { id:number, role: string} lo declaramos fuera para que se pueda utilizar fuera de ella. 
        }
    }
}


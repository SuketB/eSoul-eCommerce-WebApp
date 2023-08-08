import jwt from 'jsonwebtoken'

export const generateToken = (id)=>{
    return jwt.sign({ id }, 'password', { expiresIn: '30d' })
}
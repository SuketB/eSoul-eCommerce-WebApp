import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Suket Bhola',
    email: 'suketbhola2002@gmail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'Rankit Gujar',
    email: 'rankit@gmail.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Divyam',
    email: 'divyam@gmail.com',
    password: bcrypt.hashSync('password', 10),
  },
]

export default users
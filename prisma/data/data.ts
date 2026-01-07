import { Users } from "@/interfaces";
import bcrypt from "bcryptjs";

const users: Users[] = [
    { 
        name: 'Maykel Cintron',
        email: 'tecnopcell211000@gmail.com',
        password: bcrypt.hashSync('123456'),
        role: 'ADMIN'
    },
    { 
        name: 'Jhon Molina',
        email: 'jhonmolina@gmail.com',
        password: bcrypt.hashSync('123456'),
        role: 'USER'
    },
]

export { users };
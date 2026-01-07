import prisma from "@/lib/prisma"
import {  users } from "./data/data"

async function main() {
    await prisma.user.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    await prisma.user.createMany({
        data: users
    })

    console.log( 'Seed ejecutado correctamente' );
}

    main()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
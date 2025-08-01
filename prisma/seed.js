
const { PrismaClient } = require("../generated/prisma/index.js")
const hashPwd = require("../build/lib/hashPwd.js").default

const prisma = new PrismaClient()

async function main() {

    if (!await prisma.role.findFirst()) {
        await prisma.role.create({
            data: {
                id: 1,
                name: "admin"
            }
        })

        await prisma.role.create({
            data: {
                id: 2,
                name: "operator"
            }
        })
    }

    if (!await prisma.user.findFirst()) {
        await prisma.user.create({
            data: {
                username: "admin",
                password: await hashPwd("admin"),
                roleId: 1
            }
        })
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
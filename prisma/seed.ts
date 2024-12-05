import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
    for (let i = 0; i < 10; i++) {
        const gyerek = await prisma.child.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                isGood: faker.datatype.boolean(),
            },
        });

        await prisma.toy.create({
            data: {
                name: faker.commerce.productName(),
                material: faker.helpers.arrayElement(['wood', 'plastic', 'metal', 'other']),
                weight: faker.number.float({ min: 1, max: 10 }),
                childId: gyerek.id,
            },
        });
    }
    await prisma.$disconnect();
}

main();

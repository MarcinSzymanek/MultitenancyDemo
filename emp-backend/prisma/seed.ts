import argon from 'argon2';
import { CreateTenantDto } from 'src/modules/tenants/dto/tenant.dto';
import { $Enums, PrismaClient } from '../generated/prisma';

const seedData: CreateTenantDto[] = [
  {
    tenantId: 'Gaagle',
    email: 'haps@mail.org',
    firstName: 'Stevie',
    lastName: 'Hops',
    password: 'helloWorld',
  },
  {
    tenantId: 'Facescript',
    email: 'johndoe@mail.org',
    firstName: 'John',
    lastName: 'Doe',
    password: 'helloFace',
  },
];
const prisma = new PrismaClient();

async function main() {
  for (const data of seedData) {
    if (!prisma) return;
    const tenant = await prisma.tenant.create({
      data: {
        id: data.tenantId,
      },
    });
    console.log('Created new tenant: ');
    console.log(tenant);
    const hash = await argon.hash(data.password);

    const user = await prisma.user.create({
      data: {
        tenant: {
          connect: {
            id: tenant.id,
          },
        },
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        pwdhash: hash,
        role: $Enums.Role.ADMIN,
      },
    });
    console.log('Created new user: ');
    console.log(user);
  }
  console.log('Database seeded');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

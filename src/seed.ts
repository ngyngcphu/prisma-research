import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.testResult.deleteMany({})
  await prisma.courseEnrollment.deleteMany({})
  await prisma.test.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.course.deleteMany({})

  const grace = await prisma.user.create({
    data: {
      email: 'phu.nguyen2310@hcmut.edu.vn',
      firstName: 'Phu',
      lastName: 'Nguyen',
      social: {
        facebook: 'zinunar',
        github: 'ngyngcphu'
      }
    }
  });

  const weekFromNow = add(new Date(), { days: 7 })
  const twoWeekFromNow = add(new Date(), { days: 14 })
  const monthFromNow = add(new Date(), { days: 28 })

  const course = await prisma.course.create({
    data: {
      name: 'CRUD with Prisma',
      tests: {
        create: [
          {
            date: weekFromNow,
            name: 'First test',
          },
          {
            date: twoWeekFromNow,
            name: 'Second test',
          },
          {
            date: monthFromNow,
            name: 'Final exam',
          },
        ],
      },
    },
  })
}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })

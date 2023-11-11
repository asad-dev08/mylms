const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Photography" },
        { name: "Web Development" },
        { name: "Video Editing" },
        { name: ".NET Core" },
        { name: "Advanced Web Development" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Autocad" },
      ],
    });
    console.log("success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}
main();

/**
 * ! Executing this script will delete all data in your database and seed it with 10 student.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  // Seed the database with 10 data each
  await seed.siswa((x) => x(10));
  await seed.penggunaDashboard((x) => x(10));
  await seed.jadwal((x) => x(10));
  await seed.lokasi((x) => x(10));
  // seed event and attendance
  await seed.kegiatan((createMany) =>
    createMany(10, {
      // buat 50 kehadiran untuk setiap acara
      kehadiran: (createMany) => createMany(50)
    })
  );
  await seed.qrCode((x) => x(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log('Database seeded successfully!');

  process.exit();
};

main();

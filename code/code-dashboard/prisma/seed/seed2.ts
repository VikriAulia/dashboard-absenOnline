/**
 * ! Executing this script will delete all data in your database and seed it with meaningful sample data.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */

import { createSeedClient } from '@snaplet/seed';
import * as bcrypt from 'bcrypt';

const main = async () => {
  const seed = await createSeedClient();

  // Log start of seeding process
  console.log('Starting to seed the database...');

  // Truncate all tables in the database
  console.log('Resetting database...');
  await seed.$resetDatabase();

  // Generate hashed password for users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed PenggunaDashboard with 10 users
  console.log('Seeding pengguna_dashboard...');
  await seed.pengguna_dashboard((createMany) =>
    createMany(10, {
      email: (index) => `user${index + 1}@example.com`,
      password: hashedPassword,
      peran: (index) =>
        index === 0 ? 'ADMIN' : index % 2 === 0 ? 'GURU' : 'USER',
      nama: (index) => `User ${index + 1}`
    })
  );

  // Seed Siswa with 10 students
  console.log('Seeding siswa...');
  await seed.siswa((createMany) =>
    createMany(10, {
      nama: (index) => `Student ${index + 1}`,
      tanggal_lahir: (index) => new Date(`200${index}-01-01`),
      email: (index) => `student${index + 1}@example.com`,
      kelas: '10A',
      device_id: (index) => `device${index + 1}`
    })
  );

  // Seed Jadwal with 2 schedules
  console.log('Seeding jadwal...');
  const jadwals = await seed.jadwal((createMany) =>
    createMany(2, {
      nama: (index) => (index === 0 ? 'Morning Session' : 'Afternoon Session'),
      mulai: (index) =>
        new Date(`2024-06-26T${index === 0 ? '08' : '13'}:00:00Z`),
      selesai: (index) =>
        new Date(`2024-06-26T${index === 0 ? '12' : '17'}:00:00Z`)
    })
  );

  // Seed Lokasi with 2 locations
  console.log('Seeding lokasi...');
  const lokasi1 = await seed.lokasi.create({
    nama: 'Main Hall',
    latitude: 123.456,
    longitude: 78.91,
    area: 500
  });

  const lokasi2 = await seed.lokasi.create({
    nama: 'Outdoor Field',
    latitude: 123.456,
    longitude: 78.91,
    area: 1000
  });

  // Seed Kegiatan with 10 events, linking to schedules and locations
  console.log('Seeding kegiatan...');
  await seed.kegiatan((createMany) =>
    createMany(10, {
      judul: (index) => `Event ${index + 1}`,
      deskripsi: (index) => `Description for Event ${index + 1}`,
      id_jadwal: (index) => jadwals[index % 2].id,
      kordinat_lokasi: (index) =>
        index % 2 === 0 ? 'Main Hall' : 'Outdoor Field',
      id_pengguna: 1, // Assuming the first user (admin) is creating the events
      id_lokasi: (index) => (index % 2 === 0 ? lokasi1.id : lokasi2.id),
      // Seed 50 attendance records for each event
      kehadiran: (createMany) =>
        createMany(50, {
          status: (index) => (index % 4 === 0 ? 'HADIR' : 'ABSEN')
        })
    })
  );

  // Log end of seeding process
  console.log('Database seeded successfully!');

  process.exit();
};

main().catch((e) => {
  console.error('Error seeding the database:', e);
  process.exit(1);
});

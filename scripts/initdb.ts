import 'dotenv/config';
import { Pool } from 'pg';
import { applications, bookings, savedUniversities, scholarships, universities } from '../lib/mock-data';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  console.log('Connecting to database...');
  const client = await pool.connect();
  
  try {
    console.log('Creating tables...');
    
    await client.query(`
      DROP TABLE IF EXISTS applications CASCADE;
      DROP TABLE IF EXISTS bookings CASCADE;
      DROP TABLE IF EXISTS universities CASCADE;
      
      CREATE TABLE universities (
        id VARCHAR(255) PRIMARY KEY,
        name text NOT NULL,
        country text NOT NULL,
        city text NOT NULL,
        ranking int,
        tuition int,
        acceptanceRate float,
        image text,
        overview text
      );

      CREATE TABLE applications (
        id VARCHAR(255) PRIMARY KEY,
        university text NOT NULL,
        program text NOT NULL,
        status text NOT NULL,
        deadline text,
        progress int
      );

      CREATE TABLE bookings (
        id VARCHAR(255) PRIMARY KEY,
        mentor text NOT NULL,
        topic text NOT NULL,
        date text NOT NULL,
        time text NOT NULL,
        status text NOT NULL
      );
    `);

    console.log('Seeding universities...');
    for (const u of universities) {
      await client.query(
        'INSERT INTO universities (id, name, country, city, ranking, tuition, acceptanceRate, image, overview) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [u.id, u.name, u.country, u.city, u.ranking, u.tuition, u.acceptanceRate, u.image, u.overview]
      );
    }

    console.log('Seeding applications...');
    for (const a of applications) {
      await client.query(
        'INSERT INTO applications (id, university, program, status, deadline, progress) VALUES ($1, $2, $3, $4, $5, $6)',
        [a.id, a.university, a.program, a.status, a.deadline, a.progress]
      );
    }

    console.log('Seeding bookings...');
    for (const b of bookings) {
      await client.query(
        'INSERT INTO bookings (id, mentor, topic, date, time, status) VALUES ($1, $2, $3, $4, $5, $6)',
        [b.id, b.mentor, b.topic, b.date, b.time, b.status]
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

main();

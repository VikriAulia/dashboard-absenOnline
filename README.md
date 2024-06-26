# Dashboard Absen Online

Dashboard Absen Online is a web application built with Next.js for managing online attendance. This project uses Docker Compose for easy deployment and management.

## Features

- User management (Admins, Teachers, and Students)
- Event management with QR code scanning for attendance
- Secure authentication with hashed passwords
- Responsive design
- PostgreSQL database
- Adminer for database administration

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/VikriAulia/dashboard-absenOnline.git
cd dashboard-absenOnline
```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name
DATABASE_URL=postgresql://your_postgres_user:your_postgres_password@backend:5432/your_database_name
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

Replace `your_postgres_user`, `your_postgres_password`, `your_database_name`, and `your_nextauth_secret` with your actual database credentials and secret key for NextAuth.

### Build and Run the Docker Containers

Build and run the Docker containers using Docker Compose:

```bash
docker-compose up --build
```

This will start the following services:
- `application`: The Next.js application, available at `http://localhost:3000`
- `backend`: PostgreSQL database, available at `localhost:5432`
- `adminer`: Database administration tool, available at `http://localhost:8080`

### Access the Application

Once the containers are up and running, you can access the application at `http://localhost:3000`.

### Access the Database

Adminer is available at `http://localhost:8080` for easy database administration. Log in with the following credentials:
- **System**: PostgreSQL
- **Server**: backend
- **Username**: Your `POSTGRES_USER` value from the `.env` file
- **Password**: Your `POSTGRES_PASSWORD` value from the `.env` file
- **Database**: Your `POSTGRES_DB` value from the `.env` file

## Database Migrations

To apply database migrations, you can use the Prisma CLI within the `application` container.

Run the following command in a new terminal:

```bash
docker-compose exec application npx prisma migrate dev
```

This will apply any pending migrations to the database.

## Running Tests

To run tests, use the following command:

```bash
docker-compose exec application npm test
```

## Deployment

To deploy this project in a production environment, ensure you set the appropriate environment variables and build the Docker containers with the production flag:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

Ensure to create a `docker-compose.prod.yml` file with the appropriate configurations for production.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure Docker and Docker Compose are installed correctly.
- Verify your environment variables in the `.env` file.
- Check the logs of the running containers for any error messages:

```bash
docker-compose logs
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

For more information, visit the [Next.js documentation](https://nextjs.org/docs) and the [Docker documentation](https://docs.docker.com/).
```

### Key Updates and Instructions:

1. **Environment Variables**: Explained how to set up the `.env` file with necessary environment variables.
2. **Services Configuration**: Detailed explanation of each service defined in the `docker-compose.yml` file, including `application`, `backend`, and `adminer`.
3. **Building and Running Containers**: Instructions to build and run the Docker containers using `docker-compose up --build`.
4. **Accessing the Application and Database**: Provided URLs to access the application and Adminer, along with login credentials.
5. **Database Migrations**: How to run database migrations using the Prisma CLI inside the Docker container.
6. **Running Tests**: Command to run tests within the `application` container.
7. **Deployment**: Suggested creating a `docker-compose.prod.yml` for production deployment and explained how to deploy using Docker Compose.
8. **Troubleshooting**: Added tips for troubleshooting common issues.

Feel free to customize the `README.md` further to fit your project specifics, such as updating the repository URL or adding more detailed instructions for certain steps.
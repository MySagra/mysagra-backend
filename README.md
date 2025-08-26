# MySagra - Express API Server

An Express-based REST API designed to manage **MySagra**, an application dedicated to organizing and administering local festivals. The server handles event management, user authentication, bookings, menu planning, and more, providing a robust backend for efficient festival coordination.

## Quick Start

```bash
git clone https://github.com/MySagra/mysagra-backend.git
cd mysagra-backend
```

Set up the environment variables in the `.env` file located at the project root:

```env
PEPPER="your_pepper"
JWT_SECRET="your_jwt_secret"
FRONTEND_URL="http://example.com/"
```

**It is recommended** to set both the `ROOT_PASSWORD` and `DB_USER_PASSWORD` (they have default values in the Docker Compose file).

To start the server, run:

```bash
docker compose up -d
```

## Development

```bash
git clone https://github.com/MySagra/mysagra-backend.git
npm install
```

Set up the `.env` file by following the `.env.template` example.

```bash
npm run generate
npm run db:migrate
npm run db:seed   # optional
npm run dev
```

## Usage

If you run the API server using the quick start guide, or if you used the seed command, you will be able to log in as the admin user.  
The admin credentials are:

- **Username:** `admin`
- **Password:** `admin`

Use these to access the protected routes.

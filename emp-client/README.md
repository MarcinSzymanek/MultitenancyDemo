# Emp-client: React Client demo of Multitenancy concept

## Build Setup

You need a locally running emp-backend instance and an .env file which should look like this:
```
VITE_STORAGE_JWT_TOKEN='emp-jwt'
VITE_API_URL_BASE='http://localhost:3000/'
```

In the project root run

```
$ npm install
```

You can then run the client with

```
$ npm run dev
```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
exports.Content = `version: '3.2'

volumes:
  postgres_data:
  axiomdb_data:

services:
  axiom-db:
    image: axiomhq/axiom-db:\${AXIOM_VERSION}
    environment:
      AXIOM_POSTGRES_URL: "postgres://axiom:axiom@postgres?sslmode=disable&connect_timeout=5"
      AXIOM_STORAGE: "file:///data"
    depends_on:
      - minio
      - postgres
    restart: unless-stopped
    volumes:
      - axiomdb_data:/data
  axiom-core:
    image: axiomhq/axiom-core:\${AXIOM_VERSION}
    environment:
      AXIOM_POSTGRES_URL: "postgres://axiom:axiom@postgres?sslmode=disable&connect_timeout=5"
      AXIOM_DB_URL: "http://axiom-db"
    ports:
      - 8080:80
    depends_on:
      - axiom-db
    restart: unless-stopped
  postgres: 
    image: postgres:13-alpine
    environment:
      POSTGRES_USER: axiom
      POSTGRES_PASSWORD: axiom
    volumes:
      - postgres_data:/var/lib/postgresql/data`;
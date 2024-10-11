FROM oven/bun:latest

WORKDIR /api

COPY package.json bun.lockb /api/

RUN bun install

COPY . .

EXPOSE 3434

RUN bunx prisma generate

CMD ["bun", "run", "start"]

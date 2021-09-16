FROM node:14-alpine as base

WORKDIR /app

FROM base as build

# pnpm
RUN npm install -g pnpm@6.18.0

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all local files into the image.
COPY src ./src
COPY static ./static
COPY postcss.config.cjs svelte.config.js tailwind.config.cjs tsconfig.json ./

RUN pnpm run build

RUN rm -r node_modules

RUN pnpm install --frozen-lockfile --prod

FROM base as final

COPY --from=build /app/build build
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json .

CMD ["npm", "run", "docker-start"]

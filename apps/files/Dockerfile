# Check out https://hub.docker.com/_/node to select a new base image
FROM node:18.15

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/dist/app

WORKDIR /home/node/dist/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY --chown=node package*.json ./
COPY --chown=node yarn.lock ./

RUN yarn install --frozen-lockfile

ENV PORT=3261
# Bundle app source code
COPY --chown=node . .

RUN yarn build

# Bind to all network interfaces so that it can be mapped to the host OS

EXPOSE ${PORT}

CMD [ "yarn", "start" ]

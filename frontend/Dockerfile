FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./

# Install that supports ARM Macs installation
# based on the Issue: https://github.com/parcel-bundler/lightningcss/issues/335
# and https://www.reddit.com/r/tailwindcss/comments/1jz27bu/lightningcss_building_wrong_architecture_for/
RUN npm install --include=optional --verbose \
  && npm rebuild lightningcss --build-from-source --verbose

RUN  npm install lightningcss-linux-x64-gnu

COPY . .

# Expose the default dev port
EXPOSE 3000

# Enable .env file
ENV NODE_ENV=development

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
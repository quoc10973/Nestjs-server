FROM node:20-alpine

WORKDIR /usr/src/app

# Sao chép các file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies bao gồm bcrypt
RUN npm install --production

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch mã nguồn
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]

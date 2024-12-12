# Gunakan image Node.js versi 18 sebagai base image
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container (kecuali yang dikecualikan oleh .dockerignore)
COPY . .

# Ekspos port yang digunakan oleh aplikasi (default: 8080)
EXPOSE 8080

# Jalankan aplikasi menggunakan perintah berikut
CMD ["node", "src/index.js"]

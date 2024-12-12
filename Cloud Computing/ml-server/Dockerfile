# Gunakan image Python versi 3.9
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Salin requirements.txt dan install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh kode aplikasi
COPY . .

# Ekspos port yang digunakan oleh FastAPI
EXPOSE 8080

# Jalankan aplikasi menggunakan uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import requests
from io import BytesIO

# Muat model CNN
model = load_model('skin_type_model.h5')

# Fungsi untuk memproses gambar dari URL
def process_image_from_url(image_url):
    response = requests.get(image_url)
    if response.status_code != 200:
        raise ValueError("Failed to download image")
    
    img = Image.open(BytesIO(response.content)).convert('RGB')  # Konversi ke RGB
    img = img.resize((224, 224))  # Resize ke ukuran model
    img_array = np.array(img) / 255.0  # Normalisasi
    img_array = np.expand_dims(img_array, axis=0)  # Tambahkan dimensi batch
    return img_array

# Fungsi untuk prediksi jenis kulit
def predict_skin_type(image_url):
    processed_image = process_image_from_url(image_url)
    predictions = model.predict(processed_image)
    classes = ['dry', 'normal', 'oily']  # Label kategori
    predicted_class = classes[np.argmax(predictions)]  # Ambil prediksi dengan probabilitas tertinggi
    confidence = np.max(predictions)  # Probabilitas tertinggi
    return {
        "skin_type": predicted_class,
        "confidence": float(confidence)
    }
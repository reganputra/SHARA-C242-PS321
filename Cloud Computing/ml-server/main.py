from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils import predict_skin_type

app = FastAPI()

class ImageURL(BaseModel):
    imageUrl: str

@app.post("/classify-image")
async def classify_image(data: ImageURL):
    try:
        # Prediksi jenis kulit menggunakan URL gambar
        print(f"Received image URL: {data.imageUrl}")
        result = predict_skin_type(data.imageUrl)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

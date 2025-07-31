# === FILE: backend/main.py ===
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from analyzer import analyze_resume
from utils import extract_text_from_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        print("📂 File received:", file.filename)
        text = extract_text_from_pdf(content)
        print("📄 Extracted text:", text[:1000])

        result = analyze_resume(text)
        print("✅ Final Result:", result)
        return result

    except Exception as e:
        print("❌ Server error:", e)
        return {
            "summary": "Error analyzing resume.",
            "suggestions": "",
            "job_titles": ""
        }

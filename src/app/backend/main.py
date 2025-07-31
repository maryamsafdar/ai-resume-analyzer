# # === FILE: backend/main.py ===
# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from analyzer import analyze_resume
# from utils import extract_text_from_pdf

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/upload")
# async def upload_resume(file: UploadFile = File(...)):
#     try:
#         content = await file.read()
#         print("📂 File received:", file.filename)
#         text = extract_text_from_pdf(content)
#         print("📄 Extracted text:", text[:1000])

#         result = analyze_resume(text)
#         print("✅ Final Result:", result)
#         return result

#     except Exception as e:
#         print("❌ Server error:", e)
#         return {
#             "summary": "Error analyzing resume.",
#             "suggestions": "",
#             "job_titles": ""
#         }
# === FILE: backend/main.py ===
from fastapi import FastAPI, File, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from analyzer import analyze_resume
from utils import extract_text_from_pdf
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.chat_models import ChatOpenAI



llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo")

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
        text = extract_text_from_pdf(content)
        result = analyze_resume(text)
        return result
    except Exception as e:
        print("❌ Upload Error:", e)
        return {
            "summary": "Error analyzing resume.",
            "suggestions": "",
            "job_titles": "",
            "industry": "",
            "keywords": [],
            "tips": [],
            "cover_letter": ""
        }

@app.post("/match")
async def match_resume(resume_text: str = Body(...), jd_text: str = Body(...)):
    prompt = PromptTemplate(
        input_variables=["resume", "jd"],
        template="""
Compare this resume:
{resume}

With this job description:
{jd}

Return JSON:
{"score": 84, "reason": "..."}
"""
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    result = chain.run({"resume": resume_text, "jd": jd_text})
    return eval(result.strip())
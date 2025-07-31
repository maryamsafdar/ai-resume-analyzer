# === FILE: backend/analyze.py ===
import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence
from langchain_openai import ChatOpenAI

load_dotenv()

# Use OpenAI key from .env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OPENAI_API_KEY in .env")

llm = ChatOpenAI(
    temperature=0.3,
    model="gpt-3.5-turbo",
    api_key=OPENAI_API_KEY
)

prompt_template = PromptTemplate(
    input_variables=["text"],
    template="""
You are a resume analyzer.
Analyze this resume text and return the following:
1. A short summary of the candidate.
2. Suggestions to improve the resume.
3. Recommended job titles based on experience.

Resume:
{text}

Respond ONLY with JSON like this:
{{
  "summary": "...",
  "suggestions": "...",
  "job_titles": "..."
}}
"""
)

chain: RunnableSequence = prompt_template | llm

def analyze_resume(text: str) -> dict:
    try:
        result = chain.invoke({"text": text})
        response = result.content.strip()

        print("🧠 Raw AI response:", response)

        # Parse response safely
        return eval(response) if response.startswith("{") else {
            "summary": "Invalid response from AI.",
            "suggestions": "",
            "job_titles": ""
        }

    except Exception as e:
        print("❌ Exception in analyzer:", e)
        return {
            "summary": "Error analyzing resume.",
            "suggestions": "",
            "job_titles": ""
        }

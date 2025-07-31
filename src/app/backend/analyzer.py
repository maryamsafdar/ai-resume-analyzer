# === FILE: backend/analyze.py ===
import os
import json
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence
from langchain_community.chat_models import ChatOpenAI

load_dotenv()

llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo")

prompt_template = PromptTemplate(
    input_variables=["text"],
    template="""
You are a resume analyzer.
Analyze the resume below and return the following as JSON ONLY:
1. Summary
2. Suggestions
3. Suggested job titles
4. Best-fit industry
5. Missing keywords
6. 3 resume improvement tips
7. A short, polite cover letter

Resume:
{text}

Respond with valid JSON like this:
{{
  "summary": "...",
  "suggestions": "...",
  "job_titles": "...",
  "industry": "...",
  "keywords": ["..."],
  "tips": ["..."],
  "cover_letter": "..."
}}
"""
)

chain = prompt_template | llm  # RunnableSequence

def analyze_resume(text: str) -> dict:
    try:
        response = chain.invoke({"text": text})
        print("🤖 AI Raw Response:", response.content)

        # Parse the response as JSON
        return json.loads(response.content)
    except Exception as e:
        print("❌ Error during analysis:", e)
        return {
            "summary": "Error analyzing resume.",
            "suggestions": "",
            "job_titles": "",
            "industry": "",
            "keywords": [],
            "tips": [],
            "cover_letter": ""
        }

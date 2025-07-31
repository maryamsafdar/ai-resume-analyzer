
# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer that helps candidates:
- Get a professional summary from their resume
- Receive tailored improvement suggestions
- Discover recommended job titles based on experience

Built using:
- 🐍 FastAPI (backend)
- 💡 LangChain + OpenAI (LLM analysis)
- 📄 PyMuPDF (PDF parsing)
- ⚛️ Next.js (frontend with Tailwind CSS)

---

## 🧠 Features

- Upload resume in PDF format
- Extract key insights using GPT-3.5 Turbo
- Display summary, suggestions & job recommendations
- Modern UI with chat-like interaction
- Fully responsive and integrated UI

---

## 🚀 Project Structure

```
resume-analyzer/
├── backend/
│   ├── main.py             # FastAPI server
│   ├── analyze.py          # LangChain logic
│   └── utils.py            # PDF text extraction
│   ├── requirements.txt        
│   └── .env                # API Key
├── frontend/
│   ├── pages.tsx  # Home UI
│   ├── components/
│   │   ├── UploadBox.tsx   # File uploader
│   │   └── ResumeSummary.tsx # Summary display

```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/maryamsafdar/ai-resume-analyzer
cd ai-resume-analyzer
```

---

### 2. Backend Setup (FastAPI + LangChain)

```bash
cd backend
pip install -r requirements.txt
```

#### ➕ Create `.env` file

```env
OPENAI_API_KEY=your-openai-key-here
```

#### ➕ Start backend server

```bash
uvicorn main:app --reload
```

API will be available at: [http://localhost:8000](http://localhost:8000)

---

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sample Usage

Upload any professional resume (PDF), and get:

- 📝 Summary  
- 🔧 Suggestions to improve formatting/content  
- 🎯 Job Recommendations  

---

## 🧰 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS  
- **Backend:** FastAPI, LangChain, OpenAI API  
- **PDF Parsing:** PyMuPDF (fitz)  
- **AI Model:** GPT-3.5 Turbo  
- **Deployment Ready:** Yes (Render, Vercel, etc.)

---

## 🔒 Environment Variables

| Key             | Description           |
|----------------|-----------------------|
| OPENAI_API_KEY | Your OpenAI secret key|

---

## 📦 Dependencies

From `requirements.txt`:

```txt
fastapi
uvicorn
python-dotenv
PyMuPDF
langchain
langchain-openai
openai
```

---

## 💡 Future Ideas

- Match job descriptions with resumes
- Support multiple file types (DOCX, etc.)
- Multilingual resume parsing
- Integrate with LinkedIn or GitHub

---

## 📬 Contact

For any help or feedback, contact [Maryam Safdar](mailto:maryamsafdar453@gmail.com).

---


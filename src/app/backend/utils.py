import fitz  # PyMuPDF
from typing import Union

def extract_text_from_pdf(contents: Union[bytes, bytearray]) -> str:
    try:
        with fitz.open(stream=contents, filetype="pdf") as doc:
            return "\n".join(page.get_text() for page in doc)
    except Exception:
        return ""
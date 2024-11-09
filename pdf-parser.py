from pypdf import PdfReader

def extract_text(pdf_file):
    reader = PdfReader(pdf_file)
    txt = reader.extract_text()
    print(txt)    
    
extract_text("deeznuts.pdf")
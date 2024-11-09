from pypdf import PdfReader

def extract_text(pdf_file):
    reader = PdfReader(pdf_file)
    page = reader.pages[0]
    txt = page.extract_text()
    print(txt)    
    
extract_text("deeznuts.pdf")
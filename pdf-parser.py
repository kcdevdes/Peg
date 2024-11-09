from pypdf import PdfReader

def extract_text(pdf_file):
    reader = PdfReader(pdf_file)
    ## need to iterate through all pages of pdf input, extract text from each page
    text = ""
    for i in range(len(reader.pages)): 
        page = reader.pages[i]
        text += page.extract_text()
    print(text)
    
extract_text("deeznuts.pdf")

def write_text(text):
    with open("output.txt", "w") as file:
        file.write(text)
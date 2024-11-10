## want to extract words, formatting?
# ignore special characters like bullet points?
# how to differentiate math equations and how to output into text?

## pdf -> image -> text (handle symbols somehow) -> output to txt

import pytesseract
from pdf2image import convert_from_path

def convert_to_image(pdf_file):
    images = convert_from_path(pdf_file, dpi = 500)
    return images

def extract_text(images):
    text = ""
    for i in images:
        text += pytesseract.image_to_string(i)
    return text

def write_text(text):
    with open("output.txt", "w") as file:
        file.write(text)
        
write_text(extract_text(convert_to_image("Resume (4).pdf")))
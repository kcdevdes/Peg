import pytesseract
import sys
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
    with open("./python/output.txt", "w") as file:
        file.write(text)
        
file_txt = f"./{sys.argv[1]}"
write_text(extract_text(convert_to_image(file_txt)))


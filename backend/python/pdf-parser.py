# from pypdf import PdfReader

# def extract_text(pdf_file):
#     reader = PdfReader(pdf_file)
#     ## need to iterate through all pages of pdf input, extract text from each page
#     text = ""
#     for i in range(len(reader.pages)): 
#         page = reader.pages[i]
#         text += page.extract_text()
#     ##print(text)
#     return text
# ## want to extract words, formatting?
# # ignore special characters like bullet points?
# # how to differentiate math equations and how to output into text?

# ##extract_text("deeznuts.pdf")
# def write_text(text):
#     with open("output.txt", "w") as file:
#         file.write(text)
        
# write_text(extract_text("latex-math-ex-2.pdf"))

## pdf -> image -> text (handle symbols somehow) -> output to txt

# import pytesseract
# from pdf2image import convert_from_path

# def convert_to_image(pdf_file):
#     images = convert_from_path(pdf_file, dpi = 500)
#     return images

# def extract_text(images):
#     text = ""
#     for i in images:
#         text += pytesseract.image_to_string(i)
#     return text

# def write_text(text):
#     with open("output.txt", "w") as file:
#         file.write(text)
        
# write_text(extract_text(convert_to_image("latex-math-ex-2.pdf")))

print("I am parser ")
import subprocess
import sys

def pdf_parser():
    subprocess.run(["python3", "./python/pdf-parser.py", sys.argv[1]])
    subprocess.run(["python3", "./python/prompt.py"])

if __name__ == "__main__":
    pdf_parser()

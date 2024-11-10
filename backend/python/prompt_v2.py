from groq import Groq

with open("./python/format_text.txt", 'r') as f:
    OUTPUT_FORMAT = f.read()

with open("./python/output.txt", 'r') as f:
    INPUT_TEXT = f.read()

prompt = f"""
Given the input text, create 10 multiple-choice questions.
Each question should cover key concepts, terms, or facts and include four answer choices. 
The questions should NOT be numbered. The answer choices should contain only the choices themselves, without any alphanumerical ordering.
Ensure that the questions are clear and assess understanding of the main ideas, details, and terminology.
Only one option should be correct, with the others designed to challenge comprehension by offering plausible alternatives.
For each question generated, store the question, answer, and multiple choices in a JSON Object, and append it to a JSON Array.
Each JSON Object in the JSON array should be structured in the following format:
    {{
        "question": <question>,
        "answer": <answer>,
        "choices": <an array containing the four answer choices for the respective question>
    }}

Input Text: '{INPUT_TEXT}'

"""


def return_json():
    client = Groq()
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            },
            {
                "role": "assistant",
                "content": "```json"
            }
        ],
        model="llama3-70b-8192",
        temperature=0.2,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop="```",
    )

    response = ""
    # Collect and print each chunk as it arrives
    for chunk in completion:
        # Extract and print content if available
        content = chunk.choices[0].delta.content
        if content:
            response += content

    return response

if __name__ == "__main__":
    print(return_json())

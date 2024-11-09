
import json
from groq import Groq

QUESTION_FORMAT = """
1.question
a) choice
b) choice
c) choice
d) choice
(newline)
"""

with open("./python/format_text.txt", 'r') as f:
    OUTPUT_FORMAT = f.read()

with open("./python/output.txt", 'r') as f:
    INPUT_TEXT = f.read()


prompt = f"""
Given the input text, create 10 multiple-choice questions. Each question should cover key concepts, terms, or facts and include four answer options. Ensure that the questions are clear and assess understanding of the main ideas, details, and terminology. Only one option should be correct, with the others designed to challenge comprehension by offering plausible alternatives. Please format the questions STRICTLY like the following example: {QUESTION_FORMAT}
You should format the response to look similar to this:{OUTPUT_FORMAT}

Additionally, after generating the questions, provide the correct answers in a separate section, clearly labeled as 'Answer Section' The answer section should list the correct choice.

Input Text: '{INPUT_TEXT}'

"""
#The output should be formatted STRICTLY as follows: {OUTPUT_FORMAT}


client = Groq()
completion = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)

response = ""
# Collect and print each chunk as it arrives
for chunk in completion:
    # Extract and print content if available
    content = chunk.choices[0].delta.content
    if content:
        response += content

answer_key = ""
q_numbers = 10

def return_json():
    last_index = 0
    quest = []
    count = 0
    for i in range(len(response)):
        if count < q_numbers:
            l = response[i - 1]
            r = response[i]
            if l == "\n" and r == "\n":
                if last_index == 0:
                    if i < len(response):
                        last_index = i + 1
                        continue
                quest += [response[last_index:i]]
                if i < len(response):
                    last_index = i + 1
                    count += 1
        else:
            answer_key = response[last_index:]

    data = []
# Puts questions and choices into json response
    for i, q in enumerate(quest):
        bigdict = {}
        a = q.split("\n")
        bigdict['question'] = a[0][3 + i // 9:]
        bigdict['choices'] = []
        for c in a[1:-1]:
            bigdict['choices'] += [c[3:]]
        data += [bigdict]

# Answer key into json response
    answers = answer_key.split("\n")
    for i, a in enumerate(answers[len(answers) - q_numbers:]):
        data[i]['answer'] = a[6 + i // 9:]

    formatted_json = json.dumps(data, indent=2)
    print(formatted_json)

if __name__ == "__main__":
    return_json()


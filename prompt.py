from groq import Groq

SAMPLE_TEXT = "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy. This energy is stored in molecules like glucose, which plants use as fuel for growth and repair. The process occurs in the chloroplasts of plant cells, where chlorophyll absorbs sunlight. Photosynthesis consists of two main stages: the light-dependent reactions and the Calvin cycle. During the light-dependent reactions, sunlight is absorbed by chlorophyll, which splits water molecules to release oxygen. In the Calvin cycle, carbon dioxide is used to produce glucose, which is essential for the plant's energy needs."

prompt = f"""
Given the input text, create 10 multiple-choice questions. Each question should cover key concepts, terms, or facts and include four answer options. Ensure that the questions are clear and assess understanding of the main ideas, details, and terminology. Only one option should be correct, with the others designed to challenge comprehension by offering plausible alternatives.

Additionally, after generating the questions, provide the correct answers in a separate section, clearly labeled as 'Answer Key.' The answer key should list each question's number along with the correct option (e.g., '1. B').

Input Text: '{SAMPLE_TEXT}'
"""


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

# Collect and print each chunk as it arrives
for chunk in completion:
    # Extract and print content if available
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="")  # Print each chunk of content as it streams in

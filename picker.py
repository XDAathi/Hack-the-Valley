from openai import OpenAI
Api_Key = config.OpenAiKey

client = OpenAI(Api_Key)
completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "write a haiku about ai"}
    ]
)
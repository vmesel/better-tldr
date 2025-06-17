import os
from openai import OpenAI


CLIENT = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def summarize_text(text: str, custom_prompt: str = None) -> Generator[str, None, None]:
    """
    This function uses the LLM provider API to summarize a certain text.

    Args:
        text (str): The text to summarize.
        custom_prompt (str): A custom prompt to use for the system prompt.

    Yields:
        str: The next chunk of the summarized text.
    """

    if not custom_prompt:
        custom_prompt = """
        You are a helpful assistant that summarizes text.
        """

    completions = CLIENT.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": custom_prompt},
            {"role": "user", "content": text}
        ],
        stream=True
    )

    for chunk in completions:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta.content
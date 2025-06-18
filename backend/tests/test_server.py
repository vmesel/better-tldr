import pytest

from main import app
from unittest.mock import MagicMock
from fastapi.testclient import TestClient


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def mock_openai_client(mocker):
    return mocker.patch("agent.CLIENT.chat.completions.create", return_value=MagicMock())

def test_home(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, World!"}


def test_send_text_to_summarize(client, mock_openai_client):
    response = client.post(
        "/summarize",
        data="Hello, World!",
        headers={"Content-Type": "text/plain"}
    )
    assert response.status_code == 200

    mock_openai_client.assert_called_once_with(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes text."},
            {"role": "user", "content": "Hello, World!"}
        ],
        stream=True
    )
    
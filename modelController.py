import requests
import json

class ModelController:

    headers = {
        "Content-Type": "application/json",
    }

    assistantResponse = "?2?"

    param = {

        "url": "http://localhost:8080/v1/chat/completions",
        "messages": [],
        "max_tokens": -1,
        "repeat_penalty": 1.05,
        "repeat_last_n": 1024,
        "temperature": 0.5,
        "tfs_z": 1,
        "top_k": 0,
        "top_p": 1,
        "min_p": 0.1,
        "typical_p": 1,
        "cache_prompt": True
    }

    def send(self):
        response = requests.post(self.param["url"], headers=self.headers, data=json.dumps(self.param))
        response = response.json()
        self.assistantResponse = response["choices"][0]["message"]["content"]

    def response(self):
        return self.assistantResponse

    def setParam(self, param, value):
        self.param[param] = value
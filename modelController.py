import requests
import json

class ModelController:

    def __init__(self):
        # Initialize mutable fields per instance
        self.headers = {
            "Content-Type": "application/json",
        }
        self.assistantResponse = "?2?"
        self.emit = False
        self.param = {
            "baseUrl": "http://localhost:5003",
            "url": "http://localhost:NONE/v1/chat/completions",
            "messages": [],
            "max_tokens": 10000,
            "repeat_penalty": 1,
            "repeat_last_n": 1024,
            "presence_penalty": 0,
            "temperature": 1,
            "tfs_z": 1,
            "top_k": -1,
            "top_p": 1,
            "min_p": 0.05,
            "typical_p": 1,
            "cache_prompt": True,
        }

    def send(self, ID):
        try:
            # First try llama.cpp API
            response = requests.post(
                self.param["url"],
                headers=self.headers,
                data=json.dumps(self.param)
            )
            response = response.json()
            print(response)
            self.assistantResponse = response["choices"][0]["message"]["content"]
        except (KeyError, requests.exceptions.RequestException):
            # If llama.cpp fails, try OpenAI API
            try:
                openai_params = {
                    "model": "gpt-3.5-turbo",
                    "messages": self.param["messages"],
                    "temperature": self.param["temperature"],
                    "max_tokens": 2000 if self.param["max_tokens"] == -1 else self.param["max_tokens"]
                }
                
                response = requests.post(
                    self.param["url"],
                    headers=self.headers,
                    json=openai_params
                )
                response = response.json()
                self.assistantResponse = response["choices"][0]["message"]["content"]
            except Exception as e:
                self.assistantResponse = f"Error: {str(e)}"
        self.emit("from_server", {"cmd": "responseOfModel", "data": {
            "text": self.response(),
            "ID": ID
        }})

    def response(self):
        return self.assistantResponse

    def setParam(self, param, value):
        self.param[param] = value
    
    def setEmit(self, emit):
        self.emit = emit

    def sendContinuousText(self, prompt):
        self.param["prompt"] = prompt
        try:
            print("here!")
            url = self.param["baseUrl"] + "/v1/completions"
            response = requests.post(
                url,
                headers=self.headers,
                data=json.dumps(self.param)
            )
            response = response.json()
            self.assistantResponse = response
        except Exception as e:
            try:
                url = self.param["baseUrl"] + "/completion"  # Updated endpoint path
                response = requests.post(
                    url,
                    headers=self.headers,
                    data=json.dumps(self.param)
                )
                response = response.json()
                self.assistantResponse = response
            except Exception as e:
                self.assistantResponse = f"Error: {str(e)}"
import requests

class ModelController:
   
    url = "http://localhost:5001/v1/completions"

    headers = {
        "Content-Type": "application/json"
    }

    modelResponse = " ?2?"

    param = {
        "max_context_length": 8192,
        "max_length": 150,
        "prompt": "?2?",
        "rep_pen": 1.05,
        "rep_pen_range": 1024,
        "sampler_order": [6, 0, 1, 3, 4, 2, 5],
        "stop_sequence": ["\n{[STOP]}","{[STOP]}"],
        "temperature": 0.5,
        "tfs": 1,
        "top_a": 0.5,
        "top_k": 0,
        "top_p": 1,
        "min_p": 0.1,
        "typical": 1,
        "use_default_badwordsids": False,
        "dynatemp_range": 0,
        "smoothing_factor": 0,
        "dynatemp_exponent": 1,
        "mirostat": 0,
        "mirostat_tau": 0,
        "mirostat_eta": 0,
        "genkey": "",
        "grammar": "",
        "grammar_retain_state": False,
        "memory": "",
        "images": [],
        "trim_stop": False,
        "logit_bias": {}
    }

    def send(self):

        response = requests.post(self.url, headers=self.headers, json=self.param, verify=False, stream=False)

        if response.status_code == 200:
            self.modelResponse = response.json()["choices"][0]["text"]

    def response(self):
        return self.modelResponse

    def setParam(self, param, value):
        self.param[param] = value
import requests

class ModelController:
   
    url = 'http://localhost:5000/api/v1/generate'
    modelResponse = " ?2?"

    param = {
        'prompt': "1 + 1 =",
        'max_new_tokens': 50,
        'do_sample': True,
        'temperature': 0.5,
        'top_p': 0.85,
        'typical_p': 0.85,
        'repetition_penalty': 1.15,
        'top_k': 35,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': False,
        'seed': -1,
        'add_bos_token': True,
        'truncation_length': 2048,
        'ban_eos_token': False,
        'skip_special_tokens': True,
        'stopping_strings': []
    }

    def setPrompt(self, prompt):
        self.param["prompt"] = prompt

    def send(self):
        
        response = requests.post(self.url, json=self.param)

        if response.status_code == 200:
            self.modelResponse = response.json()["results"][0]["text"]

    def response(self):
        return self.modelResponse
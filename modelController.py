import requests

class ModelController:
   
    url = 'http://localhost:5000/api/v1/generate'
    modelResponse = " ?2?"

    param = {
        'prompt': "1 + 1 =",
        'max_new_tokens': 300,
        'do_sample': True,
        'temperature': 0.5,
        'top_p': 0.9,
        'typical_p': 0.9,
        'epsilon_cutoff': 0,  # In units of 1e-4
        'eta_cutoff': 0,  # In units of 1e-4
        'repetition_penalty': 1.15,
        'top_k': 50,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': False,
        'mirostat_mode': 0,
        'mirostat_tau': 5,
        'mirostat_eta': 0.1,
        'seed': -1,
        'add_bos_token': True,
        'truncation_length': 2048,
        'ban_eos_token': False,
        'skip_special_tokens': True,
        'stopping_strings': []
    }

    def send(self):

        response = requests.post(self.url, json=self.param)

        if response.status_code == 200:
            self.modelResponse = response.json()["results"][0]["text"]

    def response(self):
        return self.modelResponse

    def setParam(self, param, value):
        self.param[param] = value

# adicinar nives de dificudade das tasks, e adicinar nives de modelos para usar modelos menores para task menores

# adicionar nivesi de velocidade para cada modelo
# adicinar niveis de temanho de input, e tamanho do output
# adicinar tipos de taks para usar tipos de modelos para cada task

# adicinar um 'reasoning' nativo para pensar

# crie(?) uma esqueleto com varios pontos, e faça cada llm dizar sua versão, (verdade, falso)

#uma factory: criar a result X juises votão sim ou não, se não tenta de novo? a marioria dos juizes dão feedback como nota?

# 'cold next' - isso vai fazer que a llm responda o texto de forma 'fria', tipo: isso foi escrito por uma llm, blalalala

#Rewrite the entire <input> adding the type of name: São Vicente (municipality), street X (street), Ilha Perdida (island), etc.

#etc

#re-escreva o texto inteiro adicinando o tipo do nome,
#São vicente(municipio), rua X(rua), ilha perdida(ilha), etc.

#Your goal is to add one type: municipality, neighborhood, street, or unknown, for each name present

#P 1
#You goal is make correlations, example: X is above Y for each name present.
#Note: focus only on regional districts (municipalities, neighborhoods, and streets)<input>.
#
#You goal is make correlations;
#for each name present in <input>.
#Note: focus only on regional districts (municipalities, neighborhoods, and streets).
#Example output:
#X is a neighborhood:
#1. Y is a street in X's neighborhood
#2. Z is a street in X's neighborhood
#...
#A is a municipalitie:
#1. X is a neighborhood in A's municipalitie
#...

#COLOCAR A INSTRUÇÃO PRIMEIRO OU INVES DA <INPUT>

# UM MODELO MAIOR PARA POUCAS ETAPAS?
# OU UM MODELO UM POUCO MAIOR - 100B 6A

# CLASSIFICAR YM OUTPUT ERRADO PARA FALAR PARA A LLM FAZER DENOVO?

# alguma coisa em duas etapas?!
# fazer a LLM der um output raço e depois falar para se aprofundar
# re=escrever o 'noise_context' para uma coisa mais inteligente - não

# adicinar um sistema de prompt foda! - NÃO!???

# NÃO?!
# QUEIO QUE A SOLUÇÃO SEJA: o blob + dividir by
# o dividir vai ver melhor o micro contestos
# o blob não vai dechar escapar nada!

# NÃO - #colocar o "top_n_sigma" para 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999 -

# Não - #fala para a LLM produzir um resultado,
# Não - #depois, fala para ela primeiro produzir um resultado LIXO, ai, fala para ela produzir um resutado otimo/normal!


import eventlet
eventlet.monkey_patch()

from modelController import ModelController
from metaModelController import MetaModelController

MetaModel = MetaModelController()
#Model = ModelController()

import logging
log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from engineio.payload import Payload
Payload.max_decode_packets = 1024

app = Flask(__name__)
app.config["SECRET KEY"] = "secret!"

socketio = SocketIO(app, async_mode='eventlet', ping_timeout=60*1000, max_http_buffer_size=10_000_000_000)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/v1/models', methods=['GET'])
def get_server_properties():
    return {
  "object": "list",
  "data": [
    {
      "id": "in middle",
      "object": "model",
      "created": 1686935002,
      "owned_by": "organization-owner"
    },
  ],
  "object": "list"
}

@app.route("/completion", methods=["POST"])
def handle_responses():
    try:
        # Get the JSON data from the request

        data = request.get_json()

        model = MetaModel.getModelBalance()

        model.sendContinuousText(data["prompt"])

        print(
            model.response()
        )
        
        # Return the response
        return model.response()
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@socketio.on("connect")
def do_connect():
    print("Client connected!")
    emit("from_server", {"cmd": "connected"})

@socketio.on("message")
def get_message(msg):
    print("Data recieved:{0}".format(msg))
    if(msg["cmd"] == "sendToModel"):
        model = MetaModel.getModelBalance()
        model.setParam("messages", msg["data"]["text"])
        model.setEmit(emit)
        model.send(msg["data"]["ID"])
    elif(msg["cmd"] == "setParam"):
        model = MetaModel.getModel(msg["data"]["id"])
        model.setParam(
            msg["data"]["param"],
            msg["data"]["value"],
        )


if __name__ == "__main__":
    print("Server started!")
    print("You may now connect with a browser at http://localhost:5020/")
    socketio.run(app, host="127.0.0.1", port=5020)
    #socketio.run(app)

from modelController import ModelController

Model = ModelController()

import logging
log = logging.getLogger("werkzeug")
log.setLevel(logging.ERROR)

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config["SECRET KEY"] = "secret!"
socketio = SocketIO(app, ping_timeout=99999)

@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("connect")
def do_connect():
    print("Client connected!")
    emit("from_server", {"cmd": "connected"})

@socketio.on("message")
def get_message(msg):
    print("Data recieved:{0}".format(msg))
    if(msg["cmd"] == "sendToModel"):
        Model.setParam("messages", msg["data"])
        Model.send()
        emit("from_server", {"cmd": "responseOfModel", "data": Model.response()})
    elif(msg["cmd"] == "setParam"):
        Model.setParam(msg["data"]["param"], msg["data"]["value"])


if __name__ == "__main__":
    print("Server started!")
    print("You may now connect with a browser at http://localhost:5020/")
    socketio.run(app, host="127.0.0.1", port=5020)
    #socketio.run(app)
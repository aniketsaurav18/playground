from flask import Flask

app = Flask(__name__)

@app.route("/api/convert", methods=["POST"])
def converter():
    

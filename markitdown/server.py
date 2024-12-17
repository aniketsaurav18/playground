from flask import Flask, request
from uuid import uuid4

app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024 # Limit 5MB

@app.route("/api/convert", methods=["POST"])
def converter():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400
    
    u = uuid4()
    
    if file:
        file.save(f'{file.filename}')
        return f'File {file.filename} uploaded successfully!', 200
    
if __name__ == '__main__':
    app.run(debug=True)

    

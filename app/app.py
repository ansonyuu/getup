from flask import Flask
from face_recognition_test import capture

app = Flask(__name__)

@app.route('/')
def capture_test():
    capture()
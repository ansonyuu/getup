from flask import Flask, render_template, Response
from frame_extraction import Camera


app = Flask(__name__)

@app.route('/')
#render webpage
def index():
    return render_template("index.html")

def gen(camera):
    while True:
    #retrieve the frame and return it as an iterator
        frame = camera.extract_frames()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
                
#define camera feed that will be displayed on the page
@app.route('/feed')
def feed():
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')



if __name__ == '__main__':
    # defining server ip address and port
    app.run(debug=True)



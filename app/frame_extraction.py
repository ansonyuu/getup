#code inspired by https://medium.com/datadriveninvestor/video-streaming-using-flask-and-opencv-c464bf8473d6
import face_recognition
import cv2
class Camera(object):

    def __init__(self):
       #capturing video
       self.video = cv2.VideoCapture(0)
    
    def __del__(self):
        #releasing camera
        self.video.release()



    def extract_frames(self):
        #declare livestream
 


        # Grab a single frame of video
        ret, frame = self.video.read()


        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = frame[:, :, ::-1]

        # Only process every other frame of video to save time


        face_locations = face_recognition.face_locations(rgb_small_frame,model="cnn")

        if not face_locations:
            print("User missing")
        # Display the results
        for (top, right, bottom, left) in face_locations:
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            
            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, "Loser" ,  (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        # Display the resulting image
        cv2.imshow('Video', frame)

        # Release handle to the webcam
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()




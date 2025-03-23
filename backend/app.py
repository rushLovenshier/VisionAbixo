from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app) 

model =  tf.keras.models.load_model("/Users/ruwandigeekiyanage/Documents/Final Year/FYP/ProjectAbixo/VisionAbixo/backend/model/visionAbixo.h5", compile=True)

# model.summary()

classes = ["healthy", "wet AMD", "dry AMD"]

def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to model's input size
    image = np.array(image) / 255.0  # 
    #tf.expand_dims(image, axis=0).shape.as_list()
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'leftEye' not in request.files or 'rightEye' not in request.files:
        return jsonify({'error': 'Missing file(s) in the request'}), 400

    leftEyeFile = request.files['leftEye']
    rightEyeFile = request.files['rightEye']

    if leftEyeFile.filename == '' or rightEyeFile.filename == '':
        return jsonify({"error": "No file(s) selected by user"}), 400
    
    leftEyeImage = Image.open(io.BytesIO(leftEyeFile.read()))
    rightEyeImage = Image.open(io.BytesIO(rightEyeFile.read()))
    processed_leftImage = preprocess_image(leftEyeImage)
    processed_rightImage = preprocess_image(rightEyeImage)
    
    predicted_class = model.predict([processed_rightImage, processed_leftImage])

    return jsonify({'prediction': classes[np.argmax(predicted_class)]})

if __name__ == '__main__':
    app.run(debug=True)

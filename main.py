from flask import Flask, request, jsonify
from flask_cors import CORS
from pymodm import MongoModel, fields, connect
import models
import numpy as np
import base64

app = Flask(__name__)
CORS(app)
connect("mongodb://localhost:27017/imageprocessor")


@app.route('/imageprocessor/original_image', methods=['POST'])
def original_image():
    r = request.get_json()
    name = r["file_name"]
    base64_image = r["base_64"]

    x = jsonify({'file_name': name, 'base_64': base64_image})

    return x


#@app.route('/imageprocessor/original_image/<file_name>', methods=['GET'])
#def get_data(file_name):

    #user = models.User.objects.raw({'_id': file_name}).first()
    #image = user.base_64
    #print(image)


@app.route('/imageprocessor/processed_image', methods=['POST'])
def processed_image():
    r = request.get_json()
    name_p = r["file_name_p"]
    base64_image_p = r["base_64_p"]

    y = jsonify({'file_name_p': name_p, 'base_64_p': base64_image_p})

    return y


def add_original_image(name, base64_image):

    u = models.User(name, base64_image)
    u.save()


#def open_image(image_filename):
    #try:
        #img = Image.open(image_filename)

        #with open(request.GET[image_filename], "rb") as image_file:
        #    encoded_string = base64.b64encode(image_file.read())
        #print(encoded_string)
        #abc = db.database_name.insert({"image": encoded_string})
        #return HttpResponse("inserted")


    #except IOError:
     #   pass

#@app.route('/imageprocessor/<image_filename>', methods=['GET'])
#def disp_image(image_filename):


if __name__ == "__main__":
    app.run(host="127.0.0.1")


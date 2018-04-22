from flask import Flask, request, jsonify
from flask_cors import CORS
from pymodm import connect
from pymodm import MongoModel, fields, connect
from PIL import Image
import numpy as np
from gridfs import GridFS
import base64

app = Flask(__name__)
CORS(app)
connect("mongodb://localhost:27017/imageprocessor")


@app.route('/imageprocessor', methods=['POST'])
def original_image():
    r = request.get_json()
    name = r["file_name"]
    base64_image = r["base_64"]

    x = jsonify({'file_name': name, 'base_64': base64_image})

    return x


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


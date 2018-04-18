from flask import Flask, request
from pymodm import connect
from pymodm import MongoModel, fields
from PIL import Image
import numpy as np
from gridfs import GridFS
import base64

#connect("mongodb://")
app = Flask(__name__)


@app.route('/image_processor', methods=['POST'])
def image_to_string(request, filename):
    with open(request.GET[filename], "rb") as image_file:
        image_string = base64.b64encode(image_file.read())
    print(image_string)
    abc = db.database_name.insert({"image": image_string})
    return abc


@app.route('/image_processor', methods=['GET'])
def string_to_image(base64string, new_file_name):
    with open(new_file_name, "wb") as image_out:
        image_out.write(base64.b64decode(base64string))


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



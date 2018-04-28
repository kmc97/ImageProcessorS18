from flask import Flask, request, jsonify
from flask_cors import CORS
from pymodm import MongoModel, fields, connect
import models

from image_processing.back_end import process_contrast_stretch, process_adapt_equalization,\
    process_histogram_equalization, process_reverse_image, process_log_compression

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
    image_proc_type = r["image_proc_type"]
    export_file_type = r["export_file_type"]

    x = jsonify({'file_name': name, 'base_64': base64_image, 'image_proc_type': image_proc_type, 'export_file_type': export_file_type})

    return x


@app.route('/imageprocessor/processed_image', methods=['POST'])
def processed_image():
    r = request.get_json()
    name_p = r["file_name_p"]
    timestamp = r["timestamp"]
    image_p_type = r["image_p_type"]
    duration = r["duration"]
    metrics = r["metrics"]
    base64_image_p = r["base_64_p"]

    y = jsonify({'file_name_p': name_p, 'timestamp': timestamp, 'image_p_type': image_p_type, 'duration': duration,
                 'metrics': metrics, 'base_64_p': base64_image_p})

    return y


def add_original_image(name, base64_image, image_proc_type, export_file_type):
    u = models.User(name, base64_image, image_proc_type, export_file_type)
    u.save()


def add_processed_image(name_p, timestamp, image_p_type, base64_image_p):
    z = models.User(name_p, timestamp, image_p_type, base64_image_p)
    z.save()


def image_type(image_proc_type):

    a = original_image()
    if image_proc_type == "contrast stretching":
        process_contrast_stretch(a[0], a[1], a[3])
    if image_proc_type == "adaptive equalization":
        process_adapt_equalization(a[0], a[1], a[4])
    if image_proc_type == "histogram equalization":
        process_histogram_equalization(a[0], a[1], a[4])
    if image_proc_type == "reverse video":
        process_reverse_image(a[0], a[1], a[4])
    if image_proc_type == "log compression":
        process_log_compression(a[0], a[1], a[4])




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


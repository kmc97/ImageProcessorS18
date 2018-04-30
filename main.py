from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from pymodm import MongoModel, fields, connect
import models
from models import return_entry, add_file

from image_processing.back_end_v2 import process_contrast_stretch, process_adapt_equalization,\
    process_histogram_equalization, process_reverse_image, process_log_compression

import numpy as np
import base64

app = Flask(__name__)
CORS(app)
connect("mongodb://localhost:27017/imageprocessor")


@app.route('/imageprocessor/original_image', methods=['POST'])
def original_image():
    info = []
    num_pixels = []
    pic_size = []
    avg_value = []

    r = request.get_json()
    name = r["file_name"]
    b64_string = r["base_64"]
#    b64_string = b64_string[0]
    image_proc_type = r["image_proc_type"]
    export_file_type = r["export_file_type"]
    b64_string = b64_string.encode("utf-8")

    if image_proc_type == "contrast stretching":
        info = process_contrast_stretch(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[5] = info[5].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[5])
        return jsonify({"info": info[0]})

    if image_proc_type == "adaptive equalization":
        info = process_adapt_equalization(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[5] = info[5].decode("utf-8")

        add_file(info[0], info[1], info[2], info[3], metrics_output, info[5])

    if image_proc_type == "histogram equalization":
        info = process_histogram_equalization(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[5] = info[5].decode("utf-8")

        add_file(info[0], info[1], info[2], info[3], metrics_output, info[5])

    if image_proc_type == "reverse video":
        info = process_reverse_image(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[5] = info[5].decode("utf-8")

        add_file(info[0], info[1], info[2], info[3], metrics_output, info[5])

    if image_proc_type == "log compression":
        info = process_log_compression(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[5] = info[5].decode("utf-8")

        add_file(info[0], info[1], info[2], info[3], metrics_output, info[5])

#    print_this = {"base64": info[2]}
    return jsonify("it worked")



@app.route('/imageprocessor/original_image/getthedata/<filename>', methods=['GET'])
def get_data(filename):
    data = return_entry(filename)
    output = {
        "filename": data[0],
        "timestamp": data[1],
        "processing_type": data[2],
        "processing_duration": data[3],
        "metrics": data[4],
        "base_64_processed": data[5]
        #"output": return_entry('testing')
    }
    return jsonify(output)


"""@app.route('/imageprocessor/processed_image', methods=['POST'])
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

    return y"""





"""def image_type(image_proc_type):

    a = original_image()
    if image_proc_type == "contrast stretching":
        info = process_contrast_stretch(a[0], a[1], a[3])
    # if image_proc_type == "adaptive equalization":
    #    info = process_adapt_equalization(a[0], a[1], a[4])
    # if image_proc_type == "histogram equalization":
     #   info = process_histogram_equalization(a[0], a[1], a[4])
    # if image_proc_type == "reverse video":
      #  info = process_reverse_image(a[0], a[1], a[4])
    # if image_proc_type == "log compression":
      #  info = process_log_compression(a[0], a[1], a[4])
    # else:
      #  print("invalid input")
        return info


a = original_image()

image_type(a[2])"""


if __name__ == "__main__":
    app.run(host="127.0.0.1")


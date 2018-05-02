from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from pymodm import MongoModel, fields, connect
import models
from models import return_entry, add_file
import logging
from processed_add import add_processed_image, check_proc_type

app = Flask(__name__)
CORS(app)
connect("mongodb://localhost:27017/imageprocessor")


logging.basicConfig(filename='logging.txt', format='%(asctime)s %(message)s', datefmt ='%m/%d/%Y &I:%M:%S %p', level=logging.DEBUG)


@app.route('/imageprocessor/original_image', methods=['POST'])
def original_image():

    """ ORIGINAL_IMAGE Function takes the input from the user (the file name, base64 encoded image, image processing
        type, and export file type), performs the desired image processing on the image and saves the base 64 encoded
        processed image, file name, image metrics, duration of processing to the database. """

    r = request.get_json()
    name = r["file_name"]
    b64_string = r["base_64"]
    image_proc_type = r["image_proc_type"]
    export_file_type = r["export_file_type"]
    b64_string = b64_string.encode("utf-8")
    check_proc_type(image_proc_type)

    add_processed_image(image_proc_type, name, b64_string, export_file_type)

    logging.info('Image added to database')
    return jsonify("it worked")


@app.route('/imageprocessor/original_image/getthedata/<filename>', methods=['GET'])
def get_data(filename):

    """ GET_DATA Function takes in the file name of the image and returns a .json file containing the file name,
    timestamp, image processing type, image processing duration, image metrics, and the base 64 encoded processed image
        :param filename: Name of the file containing the processed image.
        :returns jsonify(output): A .json file containing the file name,
    timestamp, image processing type, image processing duration, image metrics, and the base 64 encoded processed image."""

    data = return_entry(filename)
    output = {
        "filename": data[0],
        "timestamp": data[1],
        "processing_type": data[2],
        "processing_duration": data[3],
        "metrics": data[4],
        "base_64_processed": data[5]
    }

    logging.info('Processed image, image data ouput in a .json file')
    return jsonify(output)


if __name__ == "__main__":
    app.run(host="127.0.0.1")
    app.run(debug=True)


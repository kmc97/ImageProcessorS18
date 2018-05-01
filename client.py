import requests
from image_processing.manipulate_image import image_to_b64, pic_to_numpy
import json


def post_data():
    filename = 'thisNew011'
    b64_string = image_to_b64('go_bobcats.jpg')
    b64_string = b64_string.decode("utf-8")
    #b64_string = 'hello'
    process_type = 'contrast stretching'
    extension = '.jpg'

    data = {
        "file_name": filename,
        "base_64": b64_string,
        "image_proc_type": process_type,
        "export_file_type": extension
    }

    r = requests.post("http://127.0.0.1:5000/imageprocessor/original_image", json=data)

    data = r.json()
    print(data)

def get_filename():

    r = requests.get("http://127.0.0.1:5000/imageprocessor/original_image/getthedata/hello")
    data = r.json()

post_data()
#get_filename()

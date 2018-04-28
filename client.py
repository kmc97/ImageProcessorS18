import requests
import manipulate_data import image_to_b64


def post_data():
    filename = 'testing'
    b64_string = image_to_b64('go_bobcats.jpg')
    process_type = 'contrast stretching'
    extension = '.jpg'

    data = {
	"file_name": filename,
	"base_64": b64_string,
        "image_proc_type" : process_type,
        "export_file_type" : extension
	}
    r = requests.post("http://127.0.0.1:5000/imageprocessor/original_image")

#post_data()

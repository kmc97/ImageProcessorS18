import base64

def image_to_string(filename):
    with open(filename, "rb") as image_file:
        image_string = base64.b64encode(image_file.read())
        return image_string

def string_to_image(base64string, new_file_name):
    with open(new_file_name, "wb") as image_out:
        image_out.write(base64.b64decode(base64string))



import numpy as np
import base64
from scipy import misc
from PIL import Image
import logging

def image_to_string(filename):

    """ Function transforms image to b64 to numpy array
   
    :param filename: image that will be transformed to b64
    :returns image_np: numpy array containing base64
    :raises ValueError: value error if image_string is empty

    """

    with open(filename, "rb") as image_file:
        image_string = base64.b64encode(image_file.read())
        if image_string is None:
            raise ValueError("picture not converted correctly")
            logging.warning("b64 string has nothing in it")        
        image_np = np.array(image_string)
        return image_np

def string_to_image(base64string, new_file_name):
# just change the extensions for picture
    with open(new_file_name, "wb") as image_out:
        image_out.write(base64.b64decode(base64string))


def pic_to_numpy(temp_file):
    np_array = misc.imread(temp_file)
    return np_array

def numpy_to_pic(np_array, filename):
    img = Image.fromarray(np_array)
    img.save(filename)

def check_b64(b64):
    base64.b64encode(base64.b64decode(b64)) == b64
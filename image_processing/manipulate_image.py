import numpy as np
import base64
from skimage import data, color, img_as_float
from scipy import misc
import matplotlib.pyplot as plt
from PIL import Image

def image_to_string(filename):
    with open(filename, "rb") as image_file:
        image_string = base64.b64encode(image_file.read())
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
    img = Image.fromarray(np_array, 'RGB')
    img.save(filename)

np_array = pic_to_numpy('go_bobcats.jpg')
numpy_to_pic(np_array, 'my1.png')
#print(image_edge())

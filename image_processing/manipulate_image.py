import numpy as np
import base64
from scipy import misc
from PIL import Image
import logging

def image_to_b64(filename):
    """ Function transforms image to b64
   
    :param filename: image to be transformed to b64
    :returns image_string: string of b64 code
    """
    with open(filename, "rb") as image_file:
        image_string = base64.b64encode(image_file.read())
        return image_string
    
def string_to_image(base64string, new_file_name):
    """ Function transforms b64string to b64 to new file
   
    :param base64string: b64 string of the image
    :param new_file_name: name of image that b64 string will become
    :returns image: saved as new_file_name
    """
# just change the extensions for picture
    with open(new_file_name, "wb") as image_out:
        image_out.write(base64.b64decode(base64string))

def pic_to_numpy(temp_file):
    """ Function transforms image to numpy array
   
    :param temp_file: image to be numpified
    :returns np_array: numpy array of image
    """
    np_array = misc.imread(temp_file)
    return np_array

def numpy_to_pic(np_array, filename):
    """ Function transforms numpy array to image
   
    :param np_array: numpy array to be turned into image
    :param filename: file name image will be saved as
    :returns image: named filename
    """
    img = Image.fromarray(np_array)
    img.save(filename)

def check_b64(b64):
    """ Function checks if string is base64 and not empty
   
    :param b64: base64 string
    :raises TypeError: if input is not base64
    :raises ValueError: if input is empty
    """
    try:
        base64.b64encode(base64.b64decode(b64)) == b64
    except:
        raise TypeError("input is not base64")
    if b64 is None:
        raise ValueError("picture not converted correctly")
        logging.warning("b64 string has nothing in it") 
        
def check_image_input(export_type):
    """ Function checks if file type is .jpg, .png or .tiff
   
    :param export_type: user identified file type for image to be saved as
    :raises ValueError: if file extension is not .jpg, .png or .tiff
    :returns True: if pass test
    """
    if(export_type.lower().endswith( '.jpg') or export_type.lower().endswith( '.png')or export_type.lower().endswith( '.tiff')):
        return True
    else:
        raise ValueError('File can only export as .jpg, .png, .tiff')
        

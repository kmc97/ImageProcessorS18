from manipulate_image import pic_to_numpy, numpy_to_pic
from scipy import ndimage
import matplotlib.pyplot as plt
import numpy as np 
from PIL import Image
from skimage import img_as_uint, img_as_float, exposure, data
import datetime
import logging


def contrast_stretching(pic_as_numpy):
    
    """ function contrast stretches numpy array and outputs processed numpy array
    
    :param pic_as_numpy: image numpy array
    :return img_rescale: contrast strectched edited numpy array
    
    """
    
    p2, p98 = np.percentile(pic_as_numpy, (2,98))
    img_rescale =exposure.rescale_intensity(pic_as_numpy, in_range = (p2,p98))
    img_rescale = exposure.rescale_intensity(img_rescale,out_range =(0,255))
    return img_rescale

def histogram_equalization(pic_as_numpy):
    
    """ function histogram equalizes numpy array and outputs processed numpy array
    
    :param pic_as_numpy: image numpy array
    :return img_eq: histogram equalizes edited numpy array
    
    """
    img_eq = exposure.equalize_hist(pic_as_numpy)
    return img_eq

def adaptive_equalization(pic_as_numpy):
        
    """ function adaptive equalizes numpy array and outputs processed numpy array
    
    :param pic_as_numpy: image numpy array
    :return img_eq: adaptive equalizes edited numpy array
    
    """
    img_adapt = exposure.equalize_adapthist(pic_as_numpy, clip_limit = 0.03)
    return img_adapt

def invert(pic_as_numpy):
    
    """ function reverse videos (inverts) numpy array and outputs processed numpy array
    
    :param pic_as_numpy: image numpy array
    :return inverted: adaptive equalizes edited numpy array
    
    """
    
    inverted = np.invert(pic_as_numpy)
    return inverted

def convert_gray(filename):
        
    """ function manipulates initial image to turn it gray and outputs processed gray numpy array
    
    :param filename: name of image that needs to turn gray
    :return gray_array: numpy array of gray image
    
    """
    
    img = Image.open(filename).convert('L')
    updated_ending = filename.replace(filename,filename)
    img.save(updated_ending)
    gray_array = pic_to_numpy(updated_ending)
    return gray_array

def pic_metrics(np_pic):
    
    """ function takes in numpy array of image and outputs all sorts of fun  metrics
    
    :param np_pic: numpy array of desired image
    :return metrics: number of pixels, geometry of image, (min, max), average value of pixel
    
    """
    num_pixels = np_pic.size
    geo_image = np_pic.shape
    min_max = [np_pic.min(), np_pic.max()]
    avg_val = np_pic.mean()
    return num_pixels, geo_image, min_max, avg_val

def time_now():
    
    """ function prints current time stamp

    :return timestamp: current time stamp
    
    """
    
    timestamp = datetime.datetime.now()
    return timestamp

def process_time(t1):
    
    """ function determines time it takes to process image
    
    :param t1: time start of image processing
    :return duration: total time spanned during image processing
    """
    
    t2 = time_now()
    duration = t2-t1
   # dur = divmod(duration.days * 86400 + duration.seconds, 60)
  #  logging.info('process completed in' + duration)
    return duration

from manipulate_image import pic_to_numpy, numpy_to_pic
from scipy import ndimage
import matplotlib.pyplot as plt
import numpy as np 
from PIL import Image
from skimage import img_as_uint, img_as_float, exposure, data
import datetime


def contrast_stretching(pic_as_numpy):
    p2, p98 = np.percentile(pic_as_numpy, (2,98))
    img_rescale =exposure.rescale_intensity(pic_as_numpy, in_range = (p2,p98))
    img_rescale = exposure.rescale_intensity(img_rescale,out_range =(0,255))
    return img_rescale

def histogram_equalization(pic_as_numpy):
    img_eq = exposure.equalize_hist(pic_as_numpy)
    return img_eq

def adaptive_equalization(pic_as_numpy):
    img_adapt = exposure.equalize_adapthist(pic_as_numpy, clip_limit = 0.03)
    return img_adapt

def invert(pic_as_numpy):
    inverted = np.invert(pic_as_numpy)
    return inverted

def convert_gray(filename):
    img = Image.open(filename).convert('L')
    updated_ending = filename.replace(filename, "gray_" + filename)
    img.save(updated_ending)
    gray_array = pic_to_numpy(updated_ending)
    return gray_array

def pic_metrics(np_pic):
    num_pixels = np_pic.size
    geo_image = np_pic.shape
    min_max = [np_pic.min(), np_pic.max()]
    avg_val = np_pic.mean()
    return num_pixels, geo_image, min_max, avg_val

def time_now():
    timestamp = datetime.datetime.now()
    return timestamp
def process_time(t1):
    t2 = time_now()
    duration = t2-t1
    dur = divmod(duration.days * 86400 + duration.seconds, 60)
    return duration
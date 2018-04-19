from manipulate_image import pic_to_numpy, numpy_to_pic
from scipy import ndimage
import matplotlib.pyplot as plt
import numpy as np 
from PIL import Image
from skimage import img_as_uint, img_as_float, exposure, data


def contrast_streching(pic_as_numpy):
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


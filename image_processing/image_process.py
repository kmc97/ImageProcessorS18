from manipulate_image import image_to_string, string_to_image, pic_to_numpy, numpy_to_pic
from scipy import ndimage
from skimage import color
import numpy as np
from skimage import exposure
from PIL import Image
from skimage import img_as_uint
def filter_image(numpy_array):
    med_denoised = ndimage.median_filter(numpy_array, 5)
    return med_denoised

def sharpen(nump_array):
    filter_blurred = ndimage.gaussian_filter(nump_array,1)
    alpha = 1
    image = nump_array+alpha * (nump_array-filter_blurred)
    return image


def contrast_streching(numpy_array):
    p2, p98 = np.percentile(numpy_array, (2,98))
    img_rescale =exposure.rescale_intensity(numpy_array, in_range = (p2,p98))
    img_rescale = exposure.rescale_intensity(img_rescale,out_range =(0,255))
    return img_rescale

def histogram_equalization(img_rescale):
    for channel in range(img_rescale.shape[2]):
        img_rescale[:,:, channel] = exposure.equalize_hist(img_rescale[:,:, channel])
        return img_rescale

def adaptive_equalization(img_hist):
    img_hist = img_as_uint(img_hist)
    img_adapt = exposure.equalize_adapthist(img_hist, clip_limit = 0.03)
    return img_adapt


OG_pic = pic_to_numpy('UCL.jpg')
numpy_to_pic(OG_pic, 'original.jpg')

pic1 = contrast_streching(OG_pic)
numpy_to_pic(pic1, 'test.jpg')

pic2 = histogram_equalization(pic1)
numpy_to_pic(pic2, 'test1.jpg')

pic3 = adaptive_equalization(pic2)
numpy_to_pic(pic3, 'test2.jpb')

#filtered = filter_image(pic)
#numpy_to_pic(filtered, 'test.jpg')
#pic = sharpen(filtered)
#numpy_to_pic(pic,'test1.jpg')

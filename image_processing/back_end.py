import base64
import numpy as np
from scipy import misc
from PIL import Image
import datetime

from manipulate_image import string_to_image, pic_to_numpy, numpy_to_pic, image_to_string
from image_process import convert_gray, contrast_stretching, pic_metrics, time_now, process_time, adaptive_equalization, histogram_equalization
from Histogram import pic_histo, display_histogram

def process_contrast_stretch(UUID, b64_string):
    t1 = time_now()
    img = string_to_image(b64_string, 'image.jpg')
    img_np = convert_gray('image.jpg')
    contrast = contrast_stretching(img_np)
    metrics = pic_metrics(contrast)
    display_histogram(contrast, 'image.jpg')
    b64_p = image_to_string('image.jpg')
    dur_process = process_time(t1)
    b64_processed =  [UUID, dur_process, metrics, b64_p]
    return b64_processed

def process_adapt_equalization(UUID, b64_string):
    t1 = time_now()
    img = string_to_image(b64_string, 'image.jpg')
    img_np = convert_gray('image.jpg')
    adapt_eq = adaptive_equalization(img_np)
    metrics = pic_metrics(adapt_eq)
    display_histogram(adapt_eq, 'image.jpg')
    b64_p = image_to_string('image.jpg')
    dur_process = process_time(t1)
    b64_processed =  [UUID, dur_process, metrics, b64_p]
    return b64_processed

def process_histogram_equalization(UUID, b64_string):
    t1 = time_now()
    img = string_to_image(b64_string, UUID + '.jpg')
    img_np = convert_gray(UUID + '.jpg')
    histo = histogram_equalization(img_np)
    metrics = pic_metrics(histo)
    display_histogram(histo, UUID + '.jpg')
    b64_p = image_to_string(UUID + '.jpg')
    dur_process = process_time(t1)
    b64_processed =  [UUID, dur_process, metrics, b64_p]
    return b64_processed


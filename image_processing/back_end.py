import base64
import numpy as np
from scipy import misc
from PIL import Image
import datetime
import logging

from manipulate_image import string_to_image, pic_to_numpy, numpy_to_pic, check_b64, image_to_b64, check_image_input
from image_process import convert_gray, contrast_stretching, pic_metrics, time_now, process_time, adaptive_equalization, histogram_equalization, invert, time_now
from Histogram import pic_histo, display_histogram

def process_contrast_stretch(UUID, b64_string, export_file_type):
    
    """ Function takes in Unique ID and b64 image string, contrast stretches the image and outputs the Unique ID, time it took to process the image, image metrics and the b64 of the edited image

    :param UUID: User input, unique identifier where file will be pulled
    :param b64_string:  Recieved from front-end, contains b64 of desired image
    :param export_file_type: User input of desired file type
    :raises TypeError:  From check_b64,if input data is not base64
    :returns b64_processed: A list containing: the unique identifier, type of image processing, duration of processing, image metrics and the b64 string of the processed image with the histogram
    """
    check_b64(b64_string)
    check_image_input(export_file_type)
        
    t1 = time_now()
    img = string_to_image(b64_string, UUID + export_file_type)
    img_np = convert_gray(UUID + export_file_type)
    contrast = contrast_stretching(img_np)
    metrics = pic_metrics(contrast)
    display_histogram(contrast, UUID + export_file_type)
    b64_p = image_to_b64(UUID + export_file_type)
    dur_process = process_time(t1)
    b64_processed =  [UUID, 'contrast stretching', dur_process, metrics, b64_p]
    return b64_processed

def process_adapt_equalization(UUID, b64_string, export_file_type):
    
    """ Function takes in Unique ID and b64 image string, adaptively equalizes the image and outputs the Unique ID, time it took to process the image, image metrics and the b64 of the edited image with the histogram

    :param UUID: User input, unique identifier where file will be pulled
    :param b64_string:  Recieved from front-end, contains b64 of desired image
    :param export_file_type: User input of desired file type
    :raises TypeError:  From check_b64,if input data is not base64
    :returns b64_processed: A list containing: the unique identifier, type of image processing, type of image processing, duration of processing, image metrics and the b64 string of the processed image with the histogram
    """
 
    check_b64(b64_string)
    check_image_input(export_file_type)

    t1 = time_now()
    img = string_to_image(b64_string, UUID + export_file_type)
    img_np = convert_gray(UUID + export_file_type)
    adapt_eq = adaptive_equalization(img_np)
    metrics = pic_metrics(adapt_eq)
    display_histogram(adapt_eq, UUID + export_file_type)
    b64_p = image_to_b64(UUID + export_file_type)
    dur_process = process_time(t1)
    b64_processed =  [UUID, 'adaptive equalization', dur_process, metrics, b64_p]
    return b64_processed

def process_histogram_equalization(UUID, b64_string, export_file_type):

    """ Function takes in Unique ID and b64 image string, histogram equalizes the image and outputs the Unique ID, time it took to process the image, image metrics and the b64 of the edited image

    :param UUID: User input, unique identifier where file will be pulled
    :param b64_string:  Recieved from front-end, contains b64 of desired image
    :param export_file_type: User input of desired file type
    :raises TypeError: From check_b64, raises error if input is not base64
    :returns b64_processed: A list containing: the unique identifier, type of image processing, duration of processing, image metrics and the b64 string of the processed image with the histogram
    """
    
    check_b64(b64_string)
    check_image_input(export_file_type)
    
    t1 = time_now()
    img = string_to_image(b64_string, UUID + export_file_type)
    img_np = convert_gray(UUID + export_file_type)
    histo = histogram_equalization(img_np)
    metrics = pic_metrics(histo)
    display_histogram(histo, UUID + export_file_type)
    b64_p = image_to_b64(UUID + export_file_type)
    dur_process = process_time(t1)
    b64_processed =  [UUID, 'histogram equalization', dur_process, metrics, b64_p]
    return b64_processed



def process_reverse_image(UUID, b64_string, export_file_type):
    
    """ Function takes in Unique ID and b64 image string, and inverts the image and outputs the Unique ID, time it took to process the image, image metrics and the b64 of the edited image with the histogram

    :param UUID: User input, unique identifier where file will be pulled
    :param b64_string:  Recieved from front-end, contains b64 of desired image
    :param export_file_type: User input of desired file type
    :raises TypeError: From check_b64, if input data is not base64
    :raises ValueError: From check_image_input(), if not .jpg, .png, tiff
    :returns b64_processed: A list containing: the unique identifier, type of image processing, duration of processing, image metrics and the b64 string of the processed image with the histogram
    """
 
    check_b64(b64_string)
    check_image_input(export_file_type)
        
    t1 = time_now()
    img = string_to_image(b64_string, UUID + export_file_type)
    img_np = convert_gray(UUID + export_file_type)
    rev_image = invert(img_np)
    metrics = pic_metrics(rev_image)
    display_histogram(rev_image, UUID + export_file_type)
    b64_p = image_to_b64(UUID + export_file_type)
    dur_process = process_time(t1)
    b64_processed =  [UUID, 'reverse video', dur_process, metrics, b64_p]
    return b64_processed

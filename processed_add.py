from flask import Flask, request, Response, jsonify
from models import return_entry, add_file
import logging

from image_processing.back_end_v2 import process_contrast_stretch, process_adapt_equalization,\
    process_histogram_equalization, process_reverse_image, process_log_compression

logging.basicConfig(filename='logging.txt', format='%(asctime)s %(message)s', datefmt ='%m/%d/%Y &I:%M:%S %p', level=logging.DEBUG)


def add_processed_image(image_proc_type, name, b64_string, export_file_type):
    if image_proc_type == "contrast stretching":
        info = process_contrast_stretch(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[6] = info[6].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[6])
        logging.info('Image processed with contrast stretching')

    if image_proc_type == "adaptive equalization":
        info = process_adapt_equalization(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[6] = info[6].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[6])
        logging.info('Image processed with adaptive equalization')

    if image_proc_type == "histogram equalization":
        info = process_histogram_equalization(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[6] = info[6].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[6])
        logging.info('Image processed with histogram equalization')

    if image_proc_type == "reverse video":
        info = process_reverse_image(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[6] = info[6].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[6])
        logging.info('Image processed with reverse image')

    if image_proc_type == "log compression":
        info = process_log_compression(name, b64_string, export_file_type)
        metrics_list = list(info[4])
        num_pixels = metrics_list[0]
        pic_size = metrics_list[1]
        avg_value = metrics_list[2]
        metrics_output = [num_pixels, pic_size, avg_value]
        info[6] = info[6].decode("utf-8")
        add_file(info[0], info[1], info[2], info[3], metrics_output, info[6])
        logging.info('Image processed with log compression')

    return jsonify("it worked")


def check_proc_type(image_proc_type):

    """ check_proc_type function checks to make sure image_proc_type is a string
        :param image_proc_type: user selected processing technique
        :raises ValueError: if image_proc_type is not a string
        :returns True: if pass test """

    if isinstance(image_proc_type, str):
        return True
    else:
        logging.warning('Image processing type is not a string')
        print('Please choose only one processing technique.')
        raise ValueError('Please choose only one processing technique.')


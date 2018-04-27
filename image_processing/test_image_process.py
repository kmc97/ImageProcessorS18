import pytest
import numpy as np
import time

from image_process import pic_metrics, process_time, time_now
from manipulate_image import pic_to_numpy, image_to_b64
#from back_end import process_contrast_stretch

def test_pic_metrics():
    #with test photo and known pix, size, max/min, avg
    pic_np = pic_to_numpy('go_bobcats.jpg')
    metrics = pic_metrics(pic_np)

    assert(metrics[0] == 1592067)  # number of pixels
    assert(metrics[1] == (589,901,3)) #geometry of the image
    assert(metrics[2] == [0,255]) # min max intesities of pic
    assert(round(metrics[3]) == 87)

def test_process_time():
    # makes sure to take difference of the times
    t1 = time_now()
    duration = process_time(t1)
    assert(duration > 0)

# wont work because of matplot lib in Histogram.py
#def test_output_exists():
 #   UUID = ('test')
  #  b64 = image_to_b64('go_bobcats.jpg')
  #  export_file_type = ('.jpg')
  #  results = process_contrast_stretch(UUID, b64, export_file_type)
  #  assert (results[0] == UUID)
  #  assert (isinstance(results[2], int)== True)
    

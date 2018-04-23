import pytest
import numpy as np
import time

from image_process import pic_metrics, process_time, time_now
from manipulate_image import pic_to_numpy

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
    time.sleep(1)
    duration = process_time(t1)
    assert(len(duration) == 2)
    assert(duration[1] > 0)


import pytest
import numpy as np


from manipulate_image import check_b64, check_image_input, image_to_b64


def test_check_b64():
    #make sure appropriate errors are raised
    b64_string = image_to_b64('go_bobcats.jpg')
    x =check_b64(b64_string)
    assert(x == True)

    with pytest.raises(TypeError):
        b64_not_string = ['12121221214124kgrogjfsdfsf']
        x = check_b64(b64_not_string)

    with pytest.raises(TypeError):    
        b64_is_empty = None
        x = check_b64(b64_is_empty)

def test_check_image_input():
    #make sure appropriate errors are raised
    export_type = ['.jpg', '.png', '.tiff']

    for file_type in export_type:
        valid = check_image_input(file_type)
        assert(valid == True)

    with pytest.raises(ValueError):
        incorrect = check_image_input('.pdf')
    

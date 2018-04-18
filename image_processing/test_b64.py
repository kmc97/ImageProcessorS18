from manipulate_image import image_to_string
import pytest

filename = 'go_bobcats.jpg'

def test_type_64(filename):
    img_string = image_to_string(filename)  
    return(type(img_string)) 
#        assert(type(img_string) == 'class <bytes>')

def test_new_image_created():
    pass


print(test_type_64(filename))

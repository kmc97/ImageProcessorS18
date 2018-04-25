import matplotlib
import matplotlib.pyplot as plt
import numpy as np

from skimage import data, img_as_float
from skimage import exposure


# from http://scikit-image.org/docs/dev/auto_examples/color_exposure/plot_equalize.html#sphx-glr-auto-examples-color-exposure-plot-equalize-py

def pic_histo(img, axes, bins=256):
    """Plot an image along with its histogram and cumulative histogram.

    """
    img = img_as_float(img)
    ax_img, ax_hist = axes
    ax_cdf = ax_hist.twinx()

    # Display image
    ax_img.imshow(img, cmap=plt.cm.gray)
    ax_img.set_axis_off()
    ax_img.set_adjustable('box-forced')

    # Display histogram
    ax_hist.hist(img.ravel(), bins=bins, histtype='step', color='black')
    ax_hist.ticklabel_format(axis='y', style='scientific', scilimits=(0, 0))
    ax_hist.set_xlabel('Pixel intensity')
    ax_hist.set_xlim(0, 1)
    ax_hist.set_yticks([])

    # Display cumulative distribution
    img_cdf, bins = exposure.cumulative_distribution(img, bins)
    ax_cdf.plot(bins, img_cdf, 'r')
    ax_cdf.set_yticks([])
    

    return ax_img, ax_hist, ax_cdf

def display_histogram(np_array, processed_pic):
    # function to turn processed pic into numpy
    fig = plt.figure(figsize=(8, 5))
    axes = np.zeros((2, 2), dtype=np.object)
    axes[0, 0] = fig.add_subplot(2, 2, 1)
    for i in range(1, 1):
        axes[0, 1] = fig.add_subplot(2, 4, 2, sharex=axes[0,0], sharey=axes[0,0])
    for i in range(0, 1):
        axes[1, i] = fig.add_subplot(2, 1, 2+i)

    ax_img, ax_hist, ax_cdf = pic_histo(np_array, axes[:, 0])
    ax_img.set_title(processed_pic)
    ax_hist.set_title('Histogram of ' + processed_pic)

    y_min, y_max = ax_hist.get_ylim()
    ax_hist.set_ylabel('Number of pixels')
    ax_hist.set_yticks(np.linspace(0, y_max, 5))

    ax_cdf.set_ylabel('Fraction of total intensity')
    ax_cdf.set_yticks(np.linspace(0, 1, 5))

# prevent overlap of y-axis labels
    fig.tight_layout()
    plt.savefig(processed_pic)
#
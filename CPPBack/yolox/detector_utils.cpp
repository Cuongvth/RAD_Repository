#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <vector>
#include <opencv2/opencv.hpp>

#include "detector_utils.h"
#include "item.cpp"

#if defined(_WIN32) || defined(_WIN64)
#define PRINT_OUT(...) fprintf_s(stdout, __VA_ARGS__)
#define PRINT_ERR(...) fprintf_s(stderr, __VA_ARGS__)
#else
#define PRINT_OUT(...) fprintf(stdout, __VA_ARGS__)
#define PRINT_ERR(...) fprintf(stderr, __VA_ARGS__)
#endif


int load_image(cv::Mat& img, const char* path)
{
    cv::Mat oimg = cv::imread(path, -1);
    if (oimg.empty()) {
        PRINT_ERR("\'%s\' image not found\n", path);
        return -1;
    }

    if (oimg.channels() == 3) {
        cv::cvtColor(oimg, img, cv::COLOR_BGR2BGRA);
    }
    else if (oimg.channels() == 1) {
        cv::cvtColor(oimg, img, cv::COLOR_GRAY2BGRA);
    }
    else {
        //        img = oimg.clone();
        oimg.copyTo(img);
    }

    return 0;
}


cv::Scalar hsv_to_rgb(int h, int s, int v)
{
    cv::Mat hsv(1, 1, CV_8UC3, cv::Scalar(h, s, v));
    cv::Mat rgb;

    cv::cvtColor(hsv, rgb, cv::COLOR_HSV2BGR);

    return cv::Scalar(rgb.data[0], rgb.data[1], rgb.data[2], 255);
}


int plot_result(AILIADetector* detector, cv::Mat& img, const std::vector<const char*> category, bool logging)
{
    unsigned int obj_count;
    int status = ailiaDetectorGetObjectCount(detector, &obj_count);
    if (status != AILIA_STATUS_SUCCESS) {
        PRINT_ERR("ailiaDetectorGetObjectCount failed %d\n", status);
        return -1;
    }
    if (logging) {
        PRINT_OUT("object_count=%d\n", obj_count);
    }

    std::vector<Item> item_list;

    for (int i = 0; i < obj_count; i++) {
        AILIADetectorObject obj;
        // print result
        status = ailiaDetectorGetObject(detector, &obj, i, AILIA_DETECTOR_OBJECT_VERSION);
        if (status != AILIA_STATUS_SUCCESS) {
            PRINT_ERR("ailiaDetectorGetObjectCount failed %d\n", status);
            return -1;
        }
        if (logging) {
            PRINT_OUT("+ idx=%d\n  category=%d[ %s ]\n  prob=%.15f\n  x=%.15f\n  y=%.15f\n  w=%.15f\n  h=%.15f\n",
                i, obj.category, category[obj.category], obj.prob, obj.x, obj.y, obj.w, obj.h);
        }

        cv::Point top_left((int)(img.cols * obj.x), (int)(img.rows * obj.y));
        cv::Point bottom_right((int)(img.cols * (obj.x + obj.w)), (int)(img.rows * (obj.y + obj.h)));
        cv::Point text_position((int)(img.cols * obj.x) + 4, (int)(img.rows * (obj.y + obj.h) - 8));

        // update image
        cv::Scalar color = hsv_to_rgb(256 * ((float)obj.category / (float)category.size()), 255, 255);
        float fontScale = (float)img.cols / 512.0f;
        bool check = false;
        for (size_t i = 0; i < item_list.size(); i++)
        {
            if (item_list[i].category == category[obj.category]) {
                item_list[i].quantity += 1;
                check = true;
                break;
            }
        }
        if (!check) {
            item_list.push_back({ category[obj.category], 1 });
        }
    }
    cv::Scalar color = hsv_to_rgb(255, 255, 255);
    float fontScale = 0.8;
    bool check = true;
    cv::Point text_position(20, 30);
    for (size_t i = 0; i < item_list.size(); i++)
    {
        if (item_list[i].category == "hat")
        {
            check = false;
        }
        cv::putText(img, item_list[i].category, text_position, cv::FONT_HERSHEY_SIMPLEX, fontScale, color, 2);
        text_position.y += 25;
    }
    if (check)
    {
        cv::putText(img, "No hat", text_position, cv::FONT_HERSHEY_SIMPLEX, fontScale, color, 2);
    }

    return 0;
}

/*******************************************************************
*
*    DESCRIPTION:
*      AILIA lightweight-human-pose-estimation sample
*    AUTHOR:
*
*    DATE:2020/08/24
*
*******************************************************************/
//#include "yolox_functions.h"
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <vector>
#include <string>
#include <opencv2/opencv.hpp>

#undef UNICODE

#include "ailia.h"
#include "ailia_pose_estimator.h"
#include "utils.h"
#include "image_utils.h"
#include "webcamera_utils.h"
#include "yolox_support.cpp"
using namespace std;


// ======================
// Parameters
// ======================

#define WEIGHT_PATH        "lightweight-human-pose-estimation.opt.onnx"
#define MODEL_PATH         "lightweight-human-pose-estimation.opt.onnx.prototxt"
#define WEIGHT_PATH_NORMAL "lightweight-human-pose-estimation.onnx"
#define MODEL_PATH_NORMAL  "lightweight-human-pose-estimation.onnx.prototxt"
#define ACTION_WEIGHT_PATH "action.onnx"
#define ACTION_MODEL_PATH  "action.onnx.prototxt"

#define IMAGE_PATH      "uploaded_image.png"
#define SAVE_IMAGE_PATH "output.png"

#define MODEL_INPUT_WIDTH  320
#define MODEL_INPUT_HEIGHT 240
#define IMAGE_WIDTH        320 // for video mode
#define IMAGE_HEIGHT       240 // for video mode


#if defined(_WIN32) || defined(_WIN64)
#define PRINT_OUT(...) fprintf_s(stdout, __VA_ARGS__)
#define PRINT_ERR(...) fprintf_s(stderr, __VA_ARGS__)
#else
#define PRINT_OUT(...) fprintf(stdout, __VA_ARGS__)
#define PRINT_ERR(...) fprintf(stderr, __VA_ARGS__)
#endif

#define BENCHMARK_ITERS 5

static std::string weight(WEIGHT_PATH);
static std::string model(MODEL_PATH);

static std::string weight_action(ACTION_WEIGHT_PATH);
static std::string model_action(ACTION_MODEL_PATH);

static std::string image_path(IMAGE_PATH);
static std::string video_path("0");
static std::string save_image_path(SAVE_IMAGE_PATH);

static bool benchmark = false;
static bool video_mode = false;


// ======================
// Arguemnt Parser
// ======================

static void print_usage()
{
	PRINT_OUT("usage: lightweight-human-pose-estimation [-h] [-i IMAGE] [-v VIDEO] [-n]\n");
	PRINT_OUT("                                         [-s SAVE_IMAGE_PATH] [-b]\n");
	return;
}


static void print_help()
{
	PRINT_OUT("\n");
	PRINT_OUT("fast and accurate human pose 2D-estimation.\n");
	PRINT_OUT("\n");
	PRINT_OUT("optional arguments:\n");
	PRINT_OUT("  -h, --help            show this help message and exit\n");
	PRINT_OUT("  -i IMAGE, --input IMAGE\n");
	PRINT_OUT("                        The input image path.\n");
	PRINT_OUT("  -v VIDEO, --video VIDEO\n");
	PRINT_OUT("                        The input video path. If the VIDEO argument is set to\n");
	PRINT_OUT("                        0, the webcam input will be used.\n");
	PRINT_OUT("  -n, --normal          By default, the optimized model is used, but with this\n");
	PRINT_OUT("                        option, you can switch to the normal (not optimized) model\n");
	PRINT_OUT("  -s SAVE_IMAGE_PATH, --savepath SAVE_IMAGE_PATH\n");
	PRINT_OUT("                        Save path for the output image.\n");
	PRINT_OUT("  -b, --benchmark       Running the inference on the same input 5 times to\n");
	PRINT_OUT("                        measure execution performance. (Cannot be used in\n");
	PRINT_OUT("                        video mode)\n");
	return;
}


static void print_error(std::string arg)
{
	PRINT_ERR("lightweight-human-pose-estimation: error: unrecognized arguments: %s\n", arg.c_str());
	return;
}


static int argument_parser(int argc, char** argv)
{
	int status = 0;

	for (int i = 1; i < argc; i++) {
		std::string arg = argv[i];
		if (status == 0) {
			if (arg == "-i" || arg == "--input") {
				status = 1;
			}
			else if (arg == "-v" || arg == "--video") {
				video_mode = true;
				status = 2;
			}
			else if (arg == "-s" || arg == "--savepath") {
				status = 3;
			}
			else if (arg == "-b" || arg == "--benchmark") {
				benchmark = true;
			}
			else if (arg == "-n" || arg == "--normal") {
				weight = WEIGHT_PATH_NORMAL;
				model = MODEL_PATH_NORMAL;
			}
			else if (arg == "-h" || arg == "--help") {
				print_usage();
				print_help();
				return -1;
			}
			else {
				print_usage();
				print_error(arg);
				return -1;
			}
		}
		else if (arg[0] != '-') {
			switch (status) {
			case 1:
				image_path = arg;
				break;
			case 2:
				video_path = arg;
				break;
			case 3:
				save_image_path = arg;
				break;
			default:
				print_usage();
				print_error(arg);
				return -1;
			}
			status = 0;
		}
		else {
			print_usage();
			print_error(arg);
			return -1;
		}
	}

	return AILIA_STATUS_SUCCESS;
}


// ======================
// Utils
// ======================

static cv::Scalar hsv_to_rgb(int h, int s, int v)
{
	cv::Mat hsv(1, 1, CV_8UC3, cv::Scalar(h, s, v));
	cv::Mat bgr;

	cv::cvtColor(hsv, bgr, cv::COLOR_HSV2BGR);

	return cv::Scalar(bgr.data[2], bgr.data[1], bgr.data[0]);
}


static void line(cv::Mat& img, AILIAPoseEstimatorObjectPose person, int point1, int point2)
{
	float threshold = 0.3f;

	if (person.points[point1].score > threshold &&
		person.points[point2].score > threshold) {
		cv::Scalar color = hsv_to_rgb((float)(255 * point1) / (float)AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_CNT, 255, 255);

		int x1 = img.cols * person.points[point1].x;
		int y1 = img.rows * person.points[point1].y;
		int x2 = img.cols * person.points[point2].x;
		int y2 = img.rows * person.points[point2].y;
		cv::line(img, cv::Point(x1, y1), cv::Point(x2, y2), color, 3);
	}
}


static int display_result(cv::Mat& img, AILIAPoseEstimator* pose, bool logging = true)
{
	unsigned int obj_count;
	int status = ailiaPoseEstimatorGetObjectCount(pose, &obj_count);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaPoseEstimatorGetObjectCount failed %d\n", status);
		return -1;
	}

	if (logging) {
		PRINT_OUT("person_count=%d\n", obj_count);
	}

	for (int i = 0; i < obj_count; i++) {
		AILIAPoseEstimatorObjectPose person;
		status = ailiaPoseEstimatorGetObjectPose(pose, &person, i, AILIA_POSE_ESTIMATOR_OBJECT_POSE_VERSION);
		if (status != AILIA_STATUS_SUCCESS) {
			PRINT_ERR("ailiaPoseEstimatorGetObjectPose failed %d\n", status);
			return -1;
		}
		/*
				PRINT_OUT("person %d\n",i);
				for (int j = 0; j < AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_CNT; j++) {
					PRINT_OUT("keypoint %d (%f,%f)\n", j, person.points[j].x, person.points[j].y);
				}
		*/
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_NOSE,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_CENTER);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_CENTER);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_CENTER);

		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EYE_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_NOSE);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EYE_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_NOSE);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EAR_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EYE_LEFT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EAR_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_EYE_RIGHT);

		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ELBOW_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_LEFT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ELBOW_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_RIGHT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_WRIST_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ELBOW_LEFT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_WRIST_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ELBOW_RIGHT);

		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_BODY_CENTER,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_SHOULDER_CENTER);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_HIP_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_BODY_CENTER);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_HIP_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_BODY_CENTER);

		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_KNEE_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_HIP_LEFT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ANKLE_LEFT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_KNEE_LEFT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_KNEE_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_HIP_RIGHT);
		line(img, person, AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_ANKLE_RIGHT,
			AILIA_POSE_ESTIMATOR_POSE_KEYPOINT_KNEE_RIGHT);
	}

	return AILIA_STATUS_SUCCESS;
}


// ======================
// Main functions
// ======================

static cv::Mat recognize_from_image(AILIAPoseEstimator* pose, AILIADetector* detector, cv::Mat& img)
{
	cv::Mat input_img, input_data0, input_data;
	adjust_frame_size(img, input_img, input_data0, IMAGE_WIDTH, IMAGE_HEIGHT);
	cv::cvtColor(input_data0, input_data, cv::COLOR_BGR2BGRA);

	recognize_from_image_support(input_img, detector);

	int status = ailiaPoseEstimatorCompute(pose, input_data.data,
		MODEL_INPUT_WIDTH * 4, MODEL_INPUT_WIDTH, MODEL_INPUT_HEIGHT,
		AILIA_IMAGE_FORMAT_BGRA);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaPoseEstimatorCompute failed %d\n", status);
	}

	status = display_result(input_img, pose, false);;
	if (status != AILIA_STATUS_SUCCESS) {
	}

	PRINT_OUT("Program finished successfully.\n");

	return input_img;
}


static int recognize_from_video(AILIAPoseEstimator* pose, AILIADetector* detector)
{
	// inference
	cv::VideoCapture capture;
	if (video_path == "0") {
		PRINT_OUT("[INFO] webcamera mode is activated\n");
		capture = cv::VideoCapture(0);
		if (!capture.isOpened()) {
			PRINT_ERR("[ERROR] webcamera not found\n");
			return -1;
		}
	}
	else {
		if (check_file_existance(video_path.c_str())) {
			capture = cv::VideoCapture(video_path.c_str());
		}
		else {
			PRINT_ERR("[ERROR] \"%s\" not found\n", video_path.c_str());
			return -1;
		}
	}

	while (1) {
		cv::Mat frame;
		capture >> frame;
		if ((char)cv::waitKey(1) == 'q' || frame.empty()) {
			break;
		}
		cv::Mat input_img, input_data0, input_data;
		adjust_frame_size(frame, input_img, input_data0, IMAGE_WIDTH, IMAGE_HEIGHT);
		cv::cvtColor(input_data0, input_data, cv::COLOR_BGR2BGRA);

		recognize_from_image_support(input_img, detector);

		int status = ailiaPoseEstimatorCompute(pose, input_data.data,
			MODEL_INPUT_WIDTH * 4, MODEL_INPUT_WIDTH, MODEL_INPUT_HEIGHT,
			AILIA_IMAGE_FORMAT_BGRA);
		if (status != AILIA_STATUS_SUCCESS) {
			PRINT_ERR("ailiaPoseEstimatorCompute failed %d\n", status);
			return -1;
		}

		status = display_result(input_img, pose, false);;
		if (status != AILIA_STATUS_SUCCESS) {
			return -1;
		}
		cv::imshow("frame", input_img);
	}
	capture.release();
	cv::destroyAllWindows();

	PRINT_OUT("Program finished successfully.\n");

	return AILIA_STATUS_SUCCESS;
}


cv::Mat yolox_main(cv::Mat& img)
{
	// select environment
	unsigned int env_count;
	int status = ailiaGetEnvironmentCount(&env_count);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaGetEnvironmentCount failed %d\n", status);
	}
	int env_id = AILIA_ENVIRONMENT_ID_AUTO;
	for (int i = 0; i < env_count; i++) {
		AILIAEnvironment* env_ptr = nullptr;
		status = ailiaGetEnvironment(&env_ptr, i, AILIA_ENVIRONMENT_VERSION);
		if (status != AILIA_STATUS_SUCCESS) {
			PRINT_ERR("ailiaGetEnvironment failed %d\n", status);
		}
		PRINT_OUT("idx:%d name:%s type:%d\n", i, env_ptr->name, env_ptr->type);
		if (env_ptr->type == AILIA_ENVIRONMENT_TYPE_GPU) {
			env_id = env_ptr->id;
		}
	}

	// net initialize
	AILIANetwork* ailia;
	status = ailiaCreate(&ailia, env_id, AILIA_MULTITHREAD_AUTO);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaCreate failed %d\n", status);
	}

	AILIAEnvironment* env_ptr = nullptr;
	status = ailiaGetSelectedEnvironment(ailia, &env_ptr, AILIA_ENVIRONMENT_VERSION);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaGetSelectedEnvironment failed %d\n", status);
		ailiaDestroy(ailia);
	}

	//    PRINT_OUT("env_id: %d\n", env_ptr->id);
	PRINT_OUT("env_name: %s\n", env_ptr->name);

	status = ailiaOpenStreamFile(ailia, model.c_str());
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaOpenStreamFile failed %d\n", status);
		PRINT_ERR("ailiaGetErrorDetail %s\n", ailiaGetErrorDetail(ailia));
		ailiaDestroy(ailia);
	}

	status = ailiaOpenWeightFile(ailia, weight.c_str());
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaOpenWeightFile failed %d\n", status);
		ailiaDestroy(ailia);
	}

	AILIAPoseEstimator* pose;
	status = ailiaCreatePoseEstimator(&pose, ailia, AILIA_POSE_ESTIMATOR_ALGORITHM_LW_HUMAN_POSE);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaCreatePoseEstimator failed %d\n", status);
		ailiaDestroy(ailia);
	}

	/*net initialize*/
	AILIANetwork* ailia_support;
	status = ailiaCreate(&ailia_support, env_id, AILIA_MULTITHREAD_AUTO);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaCreate failed %d\n", status);
		if (status == AILIA_STATUS_LICENSE_NOT_FOUND || status == AILIA_STATUS_LICENSE_EXPIRED) {
			PRINT_OUT("License file not found or expired : please place license file (AILIA.lic)\n");
		}
	}

	AILIAEnvironment* env_ptr_support = nullptr;
	status = ailiaGetSelectedEnvironment(ailia_support, &env_ptr_support, AILIA_ENVIRONMENT_VERSION);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaGetSelectedEnvironment failed %d\n", status);
		ailiaDestroy(ailia_support);
	}

	//    PRINT_OUT("env_id: %d\n", env_ptr->id);
	PRINT_OUT("selected env name : %s\n", env_ptr_support->name);

	status = ailiaOpenStreamFile(ailia_support, model_support.c_str());
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaOpenStreamFile failed %d\n", status);
		PRINT_ERR("ailiaGetErrorDetail %s\n", ailiaGetErrorDetail(ailia_support));
		ailiaDestroy(ailia_support);
	}

	status = ailiaOpenWeightFile(ailia_support, weight_support.c_str());
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaOpenWeightFile failed %d\n", status);
		ailiaDestroy(ailia_support);
	}
	const unsigned int flags = AILIA_DETECTOR_FLAG_NORMAL;

	AILIADetector* detector;
	status = ailiaCreateDetector(&detector, ailia_support,
		AILIA_NETWORK_IMAGE_FORMAT_BGR,
		AILIA_NETWORK_IMAGE_CHANNEL_FIRST,
		AILIA_NETWORK_IMAGE_RANGE_UNSIGNED_INT8,
		AILIA_DETECTOR_ALGORITHM_YOLOX,
		COCO_CATEGORY.size(), flags);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaCreateDetector failed %d\n", status);
		ailiaDestroy(ailia_support);
	}

	status = ailiaDetectorSetInputShape(detector, 640, 640);
	if (status != AILIA_STATUS_SUCCESS) {
		PRINT_ERR("ailiaDetectorSetInputShape(w=%u, h=%u) failed %d\n",
			640, 640, status);
		ailiaDestroyDetector(detector);
		ailiaDestroy(ailia_support);
	}

	cv::Mat output;

	if (video_mode) {
		status = recognize_from_video(pose, detector);
	}
	else {
		output = recognize_from_image(pose, detector, img);
	}

	ailiaDestroyPoseEstimator(pose);
	ailiaDestroy(ailia);

	return output;
}
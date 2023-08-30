#include <opencv2/opencv.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <cstdlib>
#include <crow.h>
#include "crow/middlewares/cors.h"
#include "base64.h"
#include "yolox_functions.h"

int main() {
	crow::App<crow::CORSHandler> app;

	auto& cors = app.get_middleware<crow::CORSHandler>();
	cors
		.global()
		.origin("*")
		.methods("POST"_method, "GET"_method, "OPTIONS"_method, "PUT"_method, "DELETE"_method)
		.headers("*")
		.max_age(3600);

	CROW_ROUTE(app, "/upload")
		.methods("POST"_method)
		([](const crow::request& req) {
		crow::response res; 

		if (!req.body.empty()) {
			try
			{
				std::string base64_image = req.body;
				cv::Mat decodedMat(1, base64_image.length(), CV_8U, const_cast<char*>(base64_image.c_str()));
				cv::Mat decodedImage = cv::imdecode(decodedMat, cv::IMREAD_UNCHANGED);

				cv::Mat output = yolox_main(decodedImage);

				std::vector<uchar> buffer;
				cv::imencode(".jpg", output, buffer);
				std::string base64Image = base64_encode(buffer.data(), buffer.size());
				res.write(base64Image);
			}
			catch (const std::exception&)
			{
				res.write("Fail");
			}
		}
		else {
			res.write("No image data provided");
		}

		res.set_header("Access-Control-Allow-Origin", "*");
		res.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); 
		res.set_header("Access-Control-Allow-Headers", "Content-Type");


		return res;
			});

	
	app.port(8080).multithreaded().run();

	return 0;
}


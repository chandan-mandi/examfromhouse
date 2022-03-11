import React from 'react';
import CommonBtn from '../../Shared/CommonBtn/CommonBtn';
import bannerImg from "../../../images/banner.png";

const Banner = () => {
    return (
		<div className="bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-500 mb-12 h-screen">
			<div className="container mx-auto py-8 md:flex md:items-center px-2">
				<div className="mx-auto w-2/3 py-24 text-center md:text-left">
					<h2 className="text-white font-semibold text-5xl">
						Online <span className="text-purple-800">Examination </span> Application
					</h2>
					<p className="text-base pt-4 pb-8">
					Online Exam is a company which provides online examination services to coaching institutes. At Online Exam portal any institute can conduct online exam with the help of powerful admin tools. Institue can schedule the exam, reuse the questions, check the results instantly.
					</p>
					<CommonBtn destination="/features" title="Features" />
				</div>
				<div className="px-2 md:w-3/5 w-full">
					<img src={bannerImg} alt="banner" />
				</div>
			</div>
		</div>
    );
};

export default Banner;
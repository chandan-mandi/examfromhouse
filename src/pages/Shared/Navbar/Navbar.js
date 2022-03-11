import React, { useState } from 'react';
import NavItems from '../NavItems/NavItems';
import { CgMenuGridR } from "react-icons/cg";
import { Link } from 'react-router-dom';
import logoImg from '../../../images/exam.png';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
    return (
		<div className="bg-blue-50">
			<nav className="flex justify-between items-center container mx-auto py-3 text-2xl font-bold px-2">
				<Link className="flex items-center" to="/"><img className="h-10" src={logoImg} alt="banner" />Online Exam</Link>
				<div
					className="lg:hidden block text-4xl"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
				<CgMenuGridR />
				</div>
				<div className="lg:block hidden">
					<div className="flex items-center">
					<NavItems />
					</div>
				</div>
			</nav>
			<div
				className={
					isOpen
						? "grid grid-rows-4 text-center items-center text-4xl font-bold"
						: "hidden"
				}
			>
				<NavItems />
			</div>
		</div>
    );
};

export default Navbar;
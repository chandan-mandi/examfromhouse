import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
	const { setUser, handleEmail, handlePassword, logInWithEmailAndPassword, signInUsingGoogle, error } = useAuth();
	const location = useLocation();
	const history = useHistory();
	const redirect_uri = location.state?.from || '/dashboard';

	const handleGoogleLogin = () => {
		signInUsingGoogle()
			.then(result => {
				history.push(redirect_uri);
			})
	}

	const handleEmailAndPasswordLogin = () => {
		logInWithEmailAndPassword()
			.then(result => {
				setUser(result.user);
				history.push(redirect_uri);
			})
	}
	return (
		<div className="flex flex-col">
			<div className="bg-blue-50 w-full lg:w-1/3 md:w-2/3 mx-auto rounded-lg my-20 px-4 py-4 shadow-lg">
				<h2 className="text-4xl title-font text-center my-5 font-bold text-purple-900">Login</h2>
				<input
					onBlur={handleEmail}
					type='email'
					placeholder="Email"
					className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-300"
				/>
				<input
					onBlur={handlePassword}
					type='password'
					placeholder="Password"
					className="w-full mb-3 px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-300"
				/>
				<div className="w-full text-center mt-2">
					<p className="text-red-600">{error}</p>
					<button
						onClick={handleEmailAndPasswordLogin}
						className="md:w-4/12 justify-self-center items-center py-1.5 px-7 border-2 border-purple-700 rounded-md text-xl font-bold text-purple-900 bg-pink-200 hover:bg-purple-700 hover:text-white"
					>Login</button>
				</div>
				<div className="flex justify-center my-4">
					<p>Or Login With <button onClick={handleGoogleLogin} className="border-b border-blue text-purple-700 font-semibold hover:border-purple-700">Google</button></p>
				</div>
				<hr />
				<div className="text-center my-6">
					<p>Don't have account? <Link to="/signup" className="text-purple-900 font-bold">Sign up</Link></p>
				</div>
			</div>
		</div>
	);
};

export default Login;
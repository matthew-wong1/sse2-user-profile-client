import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForm() {
	// Setup all user-typed fields
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		rePassword: "",
		degree: "",
	});

	// Setup errors
	const [errors, setErrors] = useState({});

	// Setup dates
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const currentYear = new Date().getFullYear();
	const startYears = Array.from(
		{ length: 11 },
		(val, index) => currentYear - 10 + index
	); // 10 years ago to this year
	const endYears = Array.from(
		{ length: 11 },
		(val, index) => currentYear + index
	); // This year to 10 years after

	// Setup checkboxes
	const [international, setInternational] = useState(false);

	const navigate = useNavigate();

	const handleCheckboxChange = (event) => {
		setInternational(event.target.checked);
	};

	const handleStartYearChange = (event) => {
		setStartYear(event.target.value);
	};

	const handleEndYearChange = (event) => {
		setEndYear(event.target.value);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const validate = (user) => {
		let errors = {};
		if (!user.firstName.trim()) errors.firstName = "First name is required";
		if (!user.email) errors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(user.email))
			errors.email = "Email address is invalid";
		if (!user.password) errors.password = "Password is required";
		else if (user.password.length < 6)
			errors.password = "Password must be 6 characters or more";
		return errors;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const validationErrors = validate(user);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			try {
				const response = await axios.post("http://localhost:5000/signup", user);
				navigate(`/user-info/${response.data.userId}`, {
					state: { user: response.data },
				});
			} catch (error) {
				console.error("There was an error signing up:", error);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type="text"
					name="firstName"
					value={user.name}
					onChange={handleChange}
					placeholder="First Name"
				/>
				{errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
			</div>
			<div>
				<input
					type="text"
					name="lastName"
					value={user.name}
					onChange={handleChange}
					placeholder="Last Name"
				/>
				{errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
			</div>
			<div>
				<input
					type="email"
					name="email"
					value={user.email}
					onChange={handleChange}
					placeholder="University Email"
				/>
				{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
			</div>
			<div>
				<input
					type="password"
					name="password"
					value={user.password}
					onChange={handleChange}
					placeholder="Password"
				/>
				{errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
			</div>
			<div>
				<input
					type="password"
					name="repassword"
					value={user.rePassword}
					onChange={handleChange}
					placeholder="Re-enter your password"
				/>
				{errors.rePassword && (
					<p style={{ color: "red" }}>{errors.rePpassword}</p>
				)}
			</div>
			<div>
				<input
					type="text"
					name="degree"
					value={user.degree}
					onChange={handleChange}
					placeholder="Full name of degree"
				/>
				{errors.degree && <p style={{ color: "red" }}>{errors.degree}</p>}
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={international}
						onChange={handleCheckboxChange}
					/>
					International student
				</label>
			</div>

			<div>
				<label>
					Start Year
					<select value={startYear} onChange={handleStartYearChange}>
						<option value="">Select a year</option>
						{startYears.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</label>
			</div>
			<div>
				<label>
					End Year
					<select value={endYear} onChange={handleEndYearChange}>
						<option value="">Select a year</option>
						{endYears.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</label>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	);
}

export default SignupForm;

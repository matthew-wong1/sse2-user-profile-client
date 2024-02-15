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
	});

	// Setup errors
	const [errors, setErrors] = useState({});

	// Setup dates
	const [startYear, setStartYear] = useState("");
	const [endYear, setEndYear] = useState("");
	const currentYear = new Date().getFullYear();
	// 10 years ago to this year
	const startYears = Array.from(
		{ length: 11 },
		(val, index) => currentYear - 10 + index
	);
	// This year to 10 years after
	const endYears = Array.from(
		{ length: 11 },
		(val, index) => currentYear + index
	);

	// Degree levels
	const [degree, setDegree] = useState("");
	const [degreeLevel, setDegreeLevel] = useState("");

	// Setup checkboxes
	const [international, setInternational] = useState(false);

	const navigate = useNavigate();

	// Handle changes to form
	const handleDegreeChange = (event) => {
		setDegree(event.target.value);
	};

	const handleDegreeLevelChange = (event) => {
		setDegreeLevel(event.target.value);
	};

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

	// Form validation
	const validate = (user) => {
		let errors = {};

		// Every field (except international cannot be empty)
		// Check if any field in the user object is empty
		Object.keys(user).forEach((key) => {
			// Trim the value to check for spaces only entries as well
			if (!user[key].trim()) {
				errors[key] = "Field cannot be empty";
			}
		});

		if (!errors) {
			// University Email: Checks that has an @ followed by a dot
			if (!/\S+@\S+\.\S+/.test(user.email))
				errors.email = "Email address is invalid";

			// Password: Must meet min requirements
			if (user.password.length < 8)
				errors.password = "Password must be 8 characters or more";
			if (user.password !== user.rePassword)
				errors.rePassword = "Passwords must match";
		}
		// Backend will query Hipo API

		// Duplicate checks in backend

		return errors;
	};

	// Setup submission
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

	// Render form
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
					name="rePassword"
					value={user.rePassword}
					onChange={handleChange}
					placeholder="Re-enter your password"
				/>
				{errors.rePassword && (
					<p style={{ color: "red" }}>{errors.rePassword}</p>
				)}
			</div>
			<div>
				<label>
					Degree
					<select value={degree} onChange={handleDegreeChange}>
						<option value="" disabled selected>
							Select a degree
						</option>
						<option value="1">Biology</option>
						<option value="2">Business</option>
						<option value="3">Chemistry</option>
						<option value="4">Computer Science</option>
						<option value="5">Engineering</option>
						<option value="6">English</option>
						<option value="7">History</option>
						<option value="8">Law</option>
						<option value="9">Medicine</option>
						<option value="10">Physics</option>
					</select>
				</label>
			</div>
			<div>
				<label>
					Degree Level
					<select value={degreeLevel} onChange={handleDegreeLevelChange}>
						<option value="" disabled selected>
							Select a degree level
						</option>
						<option value="1">Bachelor's</option>
						<option value="2">Master's</option>
						<option value="3">Doctorate</option>
					</select>
				</label>
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
						<option value="" disabled selected>
							Select a year
						</option>
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
						<option value="" disabled selected>
							Select a year
						</option>
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

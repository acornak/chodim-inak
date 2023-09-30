"use client";
import React, { FC, useState } from "react";
// Form
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Functions
import { useOnScreen } from "./shared/hooks";
// Icons
import SuccessIcon from "@/components/icons/Success";
import ErrorIcon from "@/components/icons/Error";
import UserIcon from "@/components/icons/User";
import EmailIcon from "@/components/icons/Email";
import MessageIcon from "@/components/icons/Message";
import AgeIcon from "./icons/Age";
import JobIcon from "./icons/Job";
import EducationIcon from "./icons/Education";
import CitizenshipIcon from "./icons/Citizenship";
import StayIcon from "./icons/Stay";
import SexIcon from "./icons/Sex";

type ContactFormProps = {
	lang: string;
	dict: {
		heading: string;
		button: string;
		name: {
			heading: string;
			placeholder: string;
		};
		email: string;
		message: {
			heading: string;
			placeholder: string;
		};
		error: string;
		success: string;
		required: string;
		invalidemail: string;
		sex: {
			heading: string;
			placeholder: string;
			fields: string[];
		};
		age: {
			tooyoung: string;
			tooold: string;
			heading: string;
		};
		occupation: {
			heading: string;
			placeholder: string;
		};
		education: {
			heading: string;
			placeholder: string;
			fields: string[];
		};
		stay: {
			heading: string;
			placeholder: string;
			fields: string[];
		};
		citizenship: {
			heading: string;
			placeholder: string;
			fields: string[];
		};
	};
};

const ContactForm: FC<ContactFormProps> = ({ lang, dict }): JSX.Element => {
	const options = { rootMargin: "50px" };
	const [ref, visible] = useOnScreen(options);

	const contentAnimation = `flex flex-col justify-center items-center text-center transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
	}`;

	const formAnimation = `transform transition-all ease-in-out duration-700 ${
		visible ? "translate-x-0 opacity-100" : "-translate-x-1/2 opacity-0"
	}`;

	const { executeRecaptcha } = useGoogleReCaptcha();

	const [submitError, setSubmitError] = useState<boolean>(false);
	const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

	const validationSchema = Yup.object({
		name: Yup.string().required(dict.required),
		email: Yup.string().email(dict.invalidemail).required(dict.required),
		message: Yup.string().required(dict.required),
		subject: Yup.string(),
		sex: Yup.string().required(dict.required),
		age: Yup.number()
			.min(18, dict.age.tooyoung)
			.max(70, dict.age.tooold)
			.required(dict.required),
		education: Yup.string().required(dict.required),
		occupation: Yup.string().required(dict.required),
		stay: Yup.string().required(dict.required),
		citizenship: Yup.string().required(dict.required),
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formik: any = useFormik({
		initialValues: {
			name: "",
			email: "",
			message: "",
			subject: "",
			sex: "",
			age: "",
			education: "",
			occupation: "",
			stay: "",
			citizenship: "",
		},

		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);

			if (!executeRecaptcha) {
				setSubmitError(true);
				return;
			}

			const token = await executeRecaptcha("contact_form");

			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...values,
						lang: lang,
						"g-recaptcha-response": token,
					}),
				});

				if (!response.ok) {
					setSubmitError(true);
					throw new Error("Network response was not ok");
				}
				setSubmitSuccess(true);
			} catch (error) {
				setSubmitError(true);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const iconClasses: string =
		"text-secondary dark:text-darksecondary w-6 h-6 mx-4";

	const handleForm = (): JSX.Element => {
		if (formik.isSubmitting) {
			return (
				<div className="flex justify-center items-center py-14">
					<div className="animate-spin rounded-full h-20 w-20 border-t-4 border-gray-400"></div>
				</div>
			);
		} else if (submitError) {
			return (
				<>
					<ErrorIcon className="w-12 h-12 text-red-500 px-2" />
					<div className="flex justify-center items-center py-14">
						<p>{dict.error}</p>
					</div>
				</>
			);
		} else if (submitSuccess) {
			return (
				<>
					<SuccessIcon className="w-12 h-12 text-secondary px-2" />
					<div className="flex justify-center items-center py-14">
						<p>{dict.success}</p>
					</div>
				</>
			);
		} else {
			const formClasses =
				"flex items-center w-full border-b border-gray-400 py-2 my-2";
			const inputClasses =
				"appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none";
			return (
				<form
					onSubmit={formik.handleSubmit}
					className="text-xs flex flex-col w-full"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className={formClasses}>
							<UserIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.name.heading}
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder={dict.name.placeholder}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["name"]}
									className={inputClasses}
								/>
							</div>
							<div className="w-40 mt-4 text-end">
								{formik.touched["name"] &&
								formik.errors["name"] ? (
									<div className="text-red-500">
										{formik.errors["name"]}
									</div>
								) : null}
							</div>
						</div>

						<div className={formClasses}>
							<EmailIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.email}
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="me@example.com"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["email"]}
									className={inputClasses}
								/>
							</div>
							<div className="w-72 mt-4 text-end">
								{formik.touched["email"] &&
								formik.errors["email"] ? (
									<div className="text-red-500">
										{formik.errors["email"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<SexIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.sex.heading}
								</label>
								<select
									id="sex"
									name="sex"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["sex"]}
									className={`${inputClasses} ${
										formik.values["sex"] === "" &&
										"text-gray-400"
									}`}
								>
									<option value="" disabled>
										{dict.sex.placeholder}
									</option>
									{dict.sex.fields.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["sex"] &&
								formik.errors["sex"] ? (
									<div className="text-red-500">
										{formik.errors["sex"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<AgeIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.age.heading}
								</label>
								<input
									id="age"
									name="age"
									type="text"
									placeholder="18"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["age"]}
									className={inputClasses}
								/>
							</div>
							<div className="w-72 mt-4 text-end">
								{formik.touched["age"] &&
								formik.errors["age"] ? (
									<div className="text-red-500">
										{formik.errors["age"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<JobIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.occupation.heading}
								</label>
								<input
									id="occupation"
									name="occupation"
									type="text"
									placeholder={dict.occupation.placeholder}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["occupation"]}
									className={inputClasses}
								/>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["occupation"] &&
								formik.errors["occupation"] ? (
									<div className="text-red-500">
										{formik.errors["occupation"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<EducationIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.education.heading}
								</label>
								<select
									id="education"
									name="education"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["education"]}
									className={`${inputClasses} ${
										formik.values["education"] === "" &&
										"text-gray-400"
									}`}
								>
									<option value="" disabled>
										{dict.education.placeholder}
									</option>
									{dict.education.fields.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["education"] &&
								formik.errors["education"] ? (
									<div className="text-red-500">
										{formik.errors["education"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<StayIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.stay.heading}
								</label>
								<select
									id="stay"
									name="stay"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["stay"]}
									className={`${inputClasses} ${
										formik.values["stay"] === "" &&
										"text-gray-400"
									}`}
								>
									<option value="" disabled>
										{dict.stay.placeholder}
									</option>
									{dict.stay.fields.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["stay"] &&
								formik.errors["stay"] ? (
									<div className="text-red-500">
										{formik.errors["stay"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={formClasses}>
							<CitizenshipIcon className={iconClasses} />
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									{dict.citizenship.heading}
								</label>
								<select
									id="citizenship"
									name="citizenship"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["citizenship"]}
									className={`${inputClasses} ${
										formik.values["citizenship"] === "" &&
										"text-gray-400"
									}`}
								>
									<option value="" disabled>
										{dict.citizenship.placeholder}
									</option>
									{dict.citizenship.fields.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["citizenship"] &&
								formik.errors["citizenship"] ? (
									<div className="text-red-500">
										{formik.errors["citizenship"]}
									</div>
								) : null}
							</div>
						</div>
						<div className={`hidden ${formClasses}`}>
							<div className="w-full">
								<label
									htmlFor="name"
									className="ml-2 block text-gray-700 dark:text-gray-300"
								>
									Subject
								</label>
								<input
									id="subject"
									name="subject"
									type="text"
									placeholder="Subject"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values["subject"]}
									className={inputClasses}
								/>
							</div>
							<div className="w-60 mt-4 text-end">
								{formik.touched["subject"] &&
								formik.errors["subject"] ? (
									<div className="text-red-500">
										{formik.errors["subject"]}
									</div>
								) : null}
							</div>
						</div>
					</div>
					<div className={formClasses}>
						<MessageIcon className={iconClasses} />
						<div className="w-full">
							<label
								htmlFor="name"
								className="ml-2 block text-gray-700 dark:text-gray-300"
							>
								{dict.message.heading}
							</label>
							<textarea
								id="message"
								name="message"
								placeholder={dict.message.placeholder}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values["message"]}
								className="appearance-none bg-transparent border-none w-full dark:text-darkprimary-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
							/>
						</div>
					</div>
					<div className="text-end">
						{formik.touched["message"] &&
						formik.errors["message"] ? (
							<div className="text-red-500">
								{formik.errors["message"]}
							</div>
						) : null}
					</div>
					<div className="flex justify-end pt-6">
						<button
							type="submit"
							className={`text-xs px-10 md:px-4 lg:px-6 xl:px-12 py-2 mb-4 rounded uppercase font-semibold border ${
								formik.isValid && formik.dirty
									? "text-gray-700 dark:text-gray-300 dark:text-gray-300 border-gray-700 dark:border-gray-300 cursor-pointer hover:bg-gray-700 hover:text-gray-100 dark:hover:bg-gray-300 dark:hover:text-gray-700 dark:text-gray-300"
									: "text-gray-400 dark:text-gray-500 border-gray-400 dark:border-gray-500 cursor-not-allowed"
							}`}
							disabled={!formik.isValid || !formik.dirty}
						>
							{dict.button}
						</button>
					</div>
				</form>
			);
		}
	};

	return (
		<section
			id="contact"
			className="bg-primary-bg dark:bg-gray-800 text-gray-700 dark:text-gray-300"
		>
			<h1
				className={`text-4xl mb-4 font-bold uppercase text-center pt-10 ${contentAnimation}`}
				ref={ref}
			>
				{dict.heading}
			</h1>
			<div
				className={`flex items-center justify-center mx-4 md:mx-10 ${formAnimation}`}
			>
				<div className="flex w-full h-full justify-center items-center mb-10 py-10 px-10">
					{handleForm()}
				</div>
			</div>
		</section>
	);
};

export default ContactForm;

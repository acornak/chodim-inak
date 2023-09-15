"use client";
import React, { FC, Fragment, useState } from "react";
// Form
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Functions
import { useOnScreen, useScrollToChangeURL } from "./shared/hooks";
// Icons
import SuccessIcon from "@/components/icons/Success";
import ErrorIcon from "@/components/icons/Error";
import UserIcon from "@/components/icons/User";
import EmailIcon from "@/components/icons/Email";
import MessageIcon from "@/components/icons/Message";

type ContactFormProps = {
	dict: {
		heading: string;
		button: string;
		name: string;
		email: string;
		message: string;
		error: string;
		success: string;
		required: string;
		invalidemail: string;
	};
};

const ContactForm: FC<ContactFormProps> = ({ dict }): JSX.Element => {
	const options = { rootMargin: "0px" };
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

	useScrollToChangeURL(ref, "contact");

	const validationSchema = Yup.object({
		name: Yup.string().required(dict.required),
		to: Yup.string().email(dict.invalidemail).required(dict.required),
		message: Yup.string().required(dict.required),
		subject: Yup.string(),
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formik: any = useFormik({
		initialValues: {
			name: "",
			to: "",
			message: "",
			subject: "",
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

	const formFields: {
		id: string;
		type: string;
		placeholder: string;
		icon: JSX.Element;
	}[] = [
		{
			id: "name",
			type: "text",
			placeholder: dict.name,
			icon: <UserIcon className={iconClasses} />,
		},
		{
			id: "to",
			type: "email",
			placeholder: dict.email,
			icon: <EmailIcon className={iconClasses} />,
		},
		{
			id: "message",
			type: "textarea",
			placeholder: dict.message,
			icon: <MessageIcon className={iconClasses} />,
		},
		{ id: "subject", type: "text", placeholder: "Subject", icon: <></> },
	];

	const handleForm = (): JSX.Element => {
		if (formik.isSubmitting) {
			return (
				<div className="flex justify-center items-center py-14">
					<div className="animate-spin rounded-full h-20 w-20 border-t-4 border-secondary dark:border-darksecondary"></div>
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
			return (
				<form
					onSubmit={formik.handleSubmit}
					className="text-xs flex flex-col w-full"
				>
					{formFields.map((field) =>
						field.type !== "textarea" ? (
							<Fragment key={field.id}>
								<div
									className={`flex items-center bg-primary-400 dark:bg-darkprimary-400 border-b border-secondary dark:border-darksecondary py-2 my-2 ${
										field.id === "subject" && "hidden"
									}`}
								>
									{field.icon}
									<input
										id={field.id}
										name={field.id}
										type={field.type}
										placeholder={field.placeholder}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values[field.id]}
										className="appearance-none bg-transparent border-none w-full text-primary-500 dark:text-darkprimary-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
									/>
								</div>
								{formik.touched[field.id] &&
								formik.errors[field.id] ? (
									<div className="text-red-500">
										{formik.errors[field.id]}
									</div>
								) : null}
							</Fragment>
						) : (
							<Fragment key={field.id}>
								<div className="flex items-center bg-primary-400 dark:bg-darkprimary-400 border-b border-secondary dark:border-darksecondary py-2 my-2">
									{field.icon}
									<textarea
										id={field.id}
										name={field.id}
										placeholder={field.placeholder}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values[field.id]}
										className="appearance-none bg-transparent border-none w-full text-primary-500 dark:text-darkprimary-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
									/>
								</div>
								{formik.touched[field.id] &&
								formik.errors[field.id] ? (
									<div className="text-red-500">
										{formik.errors[field.id]}
									</div>
								) : null}
							</Fragment>
						),
					)}

					<div className="flex justify-end pt-6">
						<button
							type="submit"
							className={`text-xs px-10 md:px-4 lg:px-6 xl:px-12 py-2 mb-4 rounded uppercase font-semibold border ${
								formik.isValid && formik.dirty
									? "text-gray-700 dark:text-gray-300 border-gray-700 dark:border-gray-300 cursor-pointer hover:bg-gray-700 hover:text-gray-100 dark:hover:bg-gray-300 dark:hover:text-gray-700"
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
			className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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

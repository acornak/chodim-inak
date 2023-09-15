import nodemailer from "nodemailer";
import generateConfirmationTemplate from "./confirmation";
import generateNotificationTemplate from "./notification";

async function sendMail(to: string, subject: string, html: string) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailData = {
		from: process.env.EMAIL_USERNAME,
		to,
		subject,
		html,
	};

	try {
		await transporter.sendMail(mailData);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(error);
	}
}

async function verifyRecaptcha(token: string) {
	const response = await fetch(
		"https://www.google.com/recaptcha/api/siteverify",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
		},
	);

	const data = await response.json();

	if (!data.success) {
		throw new Error("Failed reCAPTCHA verification");
	}
}

export async function POST(req: Request) {
	const body: {
		to: string;
		message: string;
		name: string;
		subject: string;
		blog: string;
		"g-recaptcha-response": string;
	} = await req.json();

	if (body.subject) {
		return new Response(JSON.stringify({ message: "No bots allowed" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}

	let message: string = "Email sent";
	let status: number = 200;

	try {
		// Verity reCAPTCHA
		await verifyRecaptcha(body["g-recaptcha-response"]);

		// Send mail to user
		await sendMail(
			body.to,
			"Thanks for reaching out!",
			generateConfirmationTemplate(body.name, body.message, body.blog),
		);

		// Send mail to me
		await sendMail(
			process.env.EMAIL_USERNAME!,
			"Someone reached out to you!",
			generateNotificationTemplate(
				body.name,
				body.to,
				body.message,
				body.blog,
			),
		);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error(error);
		message = error.message;
		status = 500;
	}

	return new Response(JSON.stringify({ message }), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

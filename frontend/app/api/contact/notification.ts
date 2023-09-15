const generateNotificationTemplate = (
	name: string,
	email: string,
	message: string,
	blog: string,
): string => {
	return `
        <!DOCTYPE html>
        <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Montserrat', Arial, sans-serif;
                }
                .container {
                    width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .banner {
                    background-color: #fcc40c;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .leading {
                    margin-top: 0;
                    text-color: #191921;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="banner">
                    <h2>New Message From ${name}</h2>
                </div>
                <p class="leading">You have a new message from ${name}, email address: ${email}${
		blog && " regarding blog post " + blog
	}.</p>
                <p class="leading">Here's what they sent you:</p>
                <blockquote>${message}</blockquote>
                <p class="leading">antoncornak.com</p>
            </div>
        </body>
        </html>
    `;
};

export default generateNotificationTemplate;

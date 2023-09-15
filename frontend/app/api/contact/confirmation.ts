const generateConfirmationTemplate = (
	name: string,
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
                .social-media {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                    color: #fcc40c;
                }
                .social-media a {
                    text-decoration: none;
                    color: #333;
                    margin: 0 5px;
                }
                .leading {
                    margin-top: 0;
                    color: #191921;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="banner">
                    <h2>Thanks for Your Message, ${name}!</h2>
                </div>
                <p class="leading">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <p class="leading">Here's what you sent${
					blog && " regarding blog post " + blog
				}:</p>
                <blockquote>${message}</blockquote>
                <p class="leading">Best,</p>
                <p class="leading">Anton</p>
                <div class="social-media">
                    <a href="mailto:a.cornak@gmail.com">Email</a>|
                    <a href="https://www.linkedin.com/in/anton-cornak/">LinkedIn</a>|
                    <a href="https://www.antoncornak.com/">Website</a>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default generateConfirmationTemplate;

const generateConfirmationTemplate = (
	name: string,
	lang: string,
	sex: string,
	age: string,
	education: string,
	occupation: string,
	stay: string,
	citizenship: string,
	email: string,
	message: string,
): string => {
	type LangMap = {
		[key: string]: {
			mainTitle: string;
			title: string;
			subtitle: string;
			subtitle2: string;
			subtitle3: string;
			button: string;
			contact: string;
			heading2: string;
			home: string;
			about: string;
			assistance: string;
			calendar: string;
			faq: string;
			copy: string;
			fullname: string;
			sex: string;
			age: string;
			occupation: string;
			education: string;
			stay: string;
			citizenship: string;
			message: string;
		};
	};

	const langMap: LangMap = {
		en: {
			mainTitle: "chodim-jinak.cz | We have received your message!",
			title: `chodim-jinak.cz | Thank you ${name} for reaching out!`,
			subtitle: `Dear ${name}, thank you for your interest!`,
			subtitle2: "I will contact you as soon as possible.",
			subtitle3: `In the meantime, please check <a href="https://www.chodim-jinak.cz/en#assistance">frequently asked questions</a> or`,
			button: "See Assistence Calendar",
			contact: "Contact Information",
			heading2: "Useful Links",
			home: "Home",
			about: "About",
			assistance: "Assistance",
			calendar: "Assistance Calendar",
			faq: "frequently asked questions",
			copy: "Copy of your answers:",
			fullname: "Full Name",
			sex: "Gender",
			age: "Age",
			occupation: "Occupation or field of study",
			education: "Highest achieved education",
			stay: "Current stay",
			citizenship: "Citizenship",
			message: "Message",
		},
		sk: {
			mainTitle: "chodim-jinak.cz | Dostali sme Vašu správu!",
			title: `chodim-jinak.cz | Ďakujem, ${name}, za záujem!`,
			subtitle: `Vážená/ý ${name}, ďakujem za záujem pomáhať!`,
			subtitle2: "Budem Vás kontaktovať hneď, ako to bude možné.",
			subtitle3: `Medzitým nájdete viac informácií o osobnej asistencii <a href="https://www.chodim-jinak.cz/en#assistance">na tomto linku</a>.`,
			contact: "Kontaktné informácie",
			button: "Zobraziť asistenčný kalendár",
			heading2: "Užitočné odkazy",
			home: "Domov",
			about: "O mne",
			assistance: "Asistencia",
			calendar: "Asistenčný kalendár",
			faq: "často kladené otázky",
			copy: "Kópia Vašich odpovedí:",
			fullname: "Celé meno",
			sex: "Pohlavie",
			age: "Vek",
			occupation: "Povolanie alebo študijný odbor",
			education: "Najvyššie dosiahnuté vzdelanie",
			stay: "Súčasný pobyt",
			citizenship: "Štátna príslušnosť",
			message: "Správa",
		},
	};

	return `
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title>${langMap[lang].mainTitle}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->
    
        <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">
    
        <!-- CSS Reset : BEGIN -->
        <style>
    
            /* What it does: Remove spaces around the email design added by some email clients. */
            /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
            html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background: #f1f1f1;
    }
    
    /* What it does: Stops email clients resizing small text. */
    * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    
    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
        margin: 0 !important;
    }
    
    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
    }
    
    /* What it does: Fixes webkit padding issue. */
    table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
    }
    
    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
        -ms-interpolation-mode:bicubic;
    }
    
    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
        text-decoration: none;
    }
    
    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],  /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
        display: none !important;
        opacity: 0.01 !important;
    }
    
    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
        color: inherit !important;
    }
    
    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img + div {
        display: none !important;
    }
    
    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */
    
    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
            min-width: 320px !important;
        }
    }
    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
            min-width: 375px !important;
        }
    }
    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
            min-width: 414px !important;
        }
    }
    
    
        </style>
    
        <!-- CSS Reset : END -->
    
        <!-- Progressive Enhancements : BEGIN -->
        <style>
    
            .primary{
        background: #2a265f;
    }
    .bg_white{
        background: #ffffff;
    }
    .bg_light{
        background: #f7fafa;
    }
    .bg_black{
        background: #000000;
    }
    .bg_dark{
        background: rgba(0,0,0,.8);
    }
    .email-section{
        padding:2.5em;
    }
    
    /*BUTTON*/
    .btn{
        padding: 10px 15px;
        display: inline-block;
    }
    .btn.btn-primary{
        border-radius: 5px;
        background: #2a265f;
        color: #ffffff;
    }
    .btn.btn-white{
        border-radius: 5px;
        background: #ffffff;
        color: #000000;
    }
    .btn.btn-white-outline{
        border-radius: 5px;
        background: transparent;
        border: 1px solid #fff;
        color: #fff;
    }
    .btn.btn-black-outline{
        border-radius: 0px;
        background: transparent;
        border: 2px solid #000;
        color: #000;
        font-weight: 700;
    }
    .btn-custom{
        color: rgba(0,0,0,.3);
        text-decoration: underline;
    }
    
    h1,h2,h3,h4,h5,h6{
        font-family: 'Poppins', sans-serif;
        color: #000000;
        margin-top: 0;
        font-weight: 400;
    }
    
    body{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.8;
        color: rgba(0,0,0,.4);
    }
    
    a{
        color: #6896c9;
    }
    
    table{
    }
    /*LOGO*/
    
    .logo h1{
        margin: 0;
    }
    .logo h1 a{
        color: #2a265f;
        font-size: 24px;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
    }
    
    /*HERO*/
    .hero{
        position: relative;
        z-index: 0;
    }
    
    .hero .text{
        color: rgba(0,0,0,.3);
    }
    .hero .text h2{
        color: #000;
        font-size: 34px;
        margin-bottom: 0;
        font-weight: 200;
        line-height: 1.4;
    }
    .hero .text h3{
        font-size: 24px;
        font-weight: 300;
    }
    .hero .text h2 span{
        font-weight: 600;
        color: #000;
    }
    
    ul.social{
        padding: 0;
    }
    ul.social li{
        display: inline-block;
        margin-right: 10px;
    }
    
    /*FOOTER*/
    
    .footer{
        border-top: 1px solid rgba(0,0,0,.05);
        color: rgba(0,0,0,.5);
    }
    .footer .heading{
        color: #000;
        font-size: 20px;
    }
    .footer ul{
        margin: 0;
        padding: 0;
    }
    .footer ul li{
        list-style: none;
        margin-bottom: 10px;
    }
    .footer ul li a{
        color: rgba(0,0,0,1);
    }
    
    
    @media screen and (max-width: 500px) {
    
    
    }
    
    
        </style>
    
    
    </head>
    
    <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
        <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            ${langMap[lang].title}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        
        <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            <!-- BEGIN BODY -->
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                          <td class="logo" style="text-align: center;">
                            <h1><a href="https://www.chodim-jinak.cz/sk" rel="noopener noreferrer" target="_blank">chodim-jinak.cz</a></h1>
                          </td>
                      </tr>
                  </table>
              </td>
              </tr><!-- end tr -->
                    <tr>
              <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 0 2.5em; text-align: center; padding-bottom: 3em;">
                            <div class="text">
                                <h2>${langMap[lang].subtitle}</h2>
                            </div>
                        </td>
                    </tr>
                    <tr>
                          <td style="text-align: center;">
                              <div class="text">
                                  <h3 class="name">${langMap[lang].subtitle2}</h3>
                                  <h4 class="name">${langMap[lang].subtitle3}</h4>
                                   <p><a href="https://www.chodim-jinak.cz/sk/calendar" class="btn btn-primary" rel="noopener noreferrer" target="_blank">${langMap[lang].button}</a></p>
                               </div>
                          </td>
                        </tr>

                    <tr style="padding: 0; margin: 0">
                        <td style="padding: 2.5em 0; text-align: center; padding-bottom: 3em;">
                            <div class="text">
                                <h3>${langMap[lang].copy}</h3>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 0">
                            <div class="text">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].fullname}: </b>${name}</p>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;">
                                        <p><b>Email: </b>${email}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].sex}: </b>${sex}</p>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].age}: </b>${age}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;">
                                        <p><b>${langMap[lang].occupation}: </b>${occupation}</p>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].education}: </b>${education}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].stay}: </b>${stay}</p>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;">
                                        <p><b>${langMap[lang].citizenship}: </b>${citizenship}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="text">
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;" class="text">
                                        <p><b>${langMap[lang].message}: </b>${message}</p>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="flex: 1; padding: 0 1em;">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </td>
                                                
                    </tr>
                </table>
              </td>
              </tr><!-- end tr -->
          <!-- 1 Column Text + Button : END -->
          </table>
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
              <td valign="middle" class="bg_light footer email-section">
                <table>
                    <td valign="top" width="50%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">${langMap[lang].contact}</h3>
                              <ul>
                                        <li><span class="text">Daniela Komanická, <a href="mailto:${process.env.NEXT_PUBLIC_EMAIL_USERNAME}">${process.env.NEXT_PUBLIC_EMAIL_USERNAME}</a></span></li>
                                        <li><span class="text"><a href="https://www.chodim-jinak.cz/sk" rel="noopener noreferrer" target="_blank">chodim-jinak.cz</a></span></a></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td valign="top" width="50%" style="padding-top: 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: left; padding-left: 10px;">
                              <h3 class="heading">${langMap[lang].heading2}</h3>
                              <ul>
                                        <li><a href="https://www.chodim-jinak.cz/sk" rel="noopener noreferrer" target="_blank">${langMap[lang].home}</a></li>
                                        <li><a href="https://www.chodim-jinak.cz/sk#me" rel="noopener noreferrer" target="_blank">${langMap[lang].about}</a></li>
                                        <li><a href="https://www.chodim-jinak.cz/sk#assistance" rel="noopener noreferrer" target="_blank">${langMap[lang].assistance}</a></li>
                                        <li><a href="https://www.chodim-jinak.cz/sk/calendar" rel="noopener noreferrer" target="_blank">${langMap[lang].calendar}</a></li>
                                      </ul>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
    </html>
    `;
};

export default generateConfirmationTemplate;

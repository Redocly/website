---
seo:
  title: Cookie Notice
slug: /cookie-notice
markdown:
    toc:
        hide: true
---

<style>
    h1 {
        margin-top: 25px !important;
        color: var(--h1-text-color);
    }

    .lnhWGv {
        display: none;
    }

    /* Conditional show-hide for mobile and desktop */
    @media (max-width:1023px) {
        .hide-on-mobile {
            display: none !important;
        }
    }

    @media (min-width:1024px) {
        .hide-on-desktop {
            display: none !important;
        }
    }

    /* Required CSS for the accordion effect on mobile */
    .transition,
    p,
    ul li i:before,
    ul li i:after { transition:all 0.25s ease-in-out; }

    .flipIn,
    h1,
    ul li { animation:flipdown 0.5s ease both; }

    .no-select,
    h2 {
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -khtml-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    .accordion h1,
    .accordion h2,
    .accordion h3,
    .accordion h4 { color:#0D2B3E; }

    .accordion h4 {
        font-size:16px;
        line-height:24px;
        display:block;
        margin:0;
        cursor:pointer;
    }

    .accordion p {
        color:#0d2b3e;
        font-size:16px;
        line-height:26px;
        font-family:Roboto,sans-serif;
        position:relative;
        overflow:hidden;
        opacity:1;
        margin-top:14px;
        z-index:2;
    }

    ul.accordion {
        list-style:none;
        perspective:900;
        box-sizing:border-box;
        margin:0;
        width:100%;
    }

    ul.accordion li {
        position:relative;
        padding:0;
        margin:0;
        padding-bottom:4px;
        padding-top:18px;
        border-top:1px solid #f8f8f8;
    }

    ul.accordion li:nth-of-type(1) { animation-delay:0.5s; }

    ul.accordion li:nth-of-type(2) { animation-delay:0.75s; }

    ul.accordion li:nth-of-type(3) { animation-delay:1s; }

    ul.accordion li:nth-of-type(4) { animation-delay:1.25s; }

    ul.accordion li:nth-of-type(5) { animation-delay:1.5s; }

    ul.accordion li:last-of-type { padding-bottom:0; }

    ul.accordion li i {
        position:absolute;
        transform:translate(-6px,0);
        margin-top:5px;
        right:0;
    }

    ul.accordion li i:before,
    ul.accordion li i:after {
        content: "";
        position:absolute;
        background-color:#0044d4;
        width:3px;
        height:9px;
    }

    ul.accordion li i:before { transform:translate(-2px,0) rotate(45deg); }

    ul.accordion li i:after { transform:translate(2px,0) rotate(-45deg); }

    @keyframes flipdown {
        0% {
            opacity:0;
            transform-origin:top center;
            transform:rotateX(-90deg);
        }
        5% { opacity:1; }
        80% { transform:rotateX(8deg); }
        83% { transform:rotateX(6deg); }
        92% { transform:rotateX(-3deg); }
        100% {
            transform-origin:top center;
            transform:rotateX(0deg);
        }
    }

    section table {
        display: block;
        width: 100%;
        overflow: auto;
        word-break: keep-all;
        border-collapse: collapse;
        border-spacing: 0px;
        margin-top: 1.5em;
        margin-bottom: 1.5em;
    }

    section table tbody {
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
    }

    section table tbody tr {
        background-color: rgb(255, 255, 255);
        border-top: 1px solid rgb(228, 231, 235);
    }

    section table tbody tr td {
        padding: 6px 13px;
        border: 1px solid rgb(228, 231, 235);
    }
</style>

<h1>Cookie Notice</h1>
<div>
<p><em>Last updated: July 18, 2021</em></p>
</div>

<p>This Cookie Notice explains how Redocly Inc. and its group companies ("Redocly", "we", "us", and "ours") use cookies and similar technologies to recognize you when you visit, interact with or use any of our websites (such as redoc.ly), online advertisements, or marketing communications (collectively for the purposes of this Notice, the "Websites"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

In some cases, we may use cookies and similar technologies to collect personal information, or information that becomes personal information if we combine it with other information. In such cases, the [Redocly Privacy Notice](./privacy-notice.md) will apply in addition to this Cookie Notice.

<h3>What are cookies?</h3>
<p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
<p>Cookies set by the website owner (in this case, Redocly) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</p>
<h3>Why do we use cookies?</h3>
<p>We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Websites. Third parties serve cookies through our Websites for advertising, analytics and other purposes. This is described in more detail below.</p>
<p>The specific types of first and third party cookies served through our Websites and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Website you visit):</p>

<!-- "Types of Cookies" section for desktop -->
<table class="hide-on-mobile">
    <tbody>
    <tr>
        <td> <p><strong>Types of cookie</strong></p> </td>
        <td> <p><strong>Who serves these cookies</strong></p> </td>
        <td> <p><strong>How to refuse</strong></p> </td>
    </tr>
    <tr>
        <td> <p><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Websites and to use some of its features, such as access to secure areas.</p> </td>
        <td> <p><strong>Redocly</strong></p> </td>
        <td> <p>Because these cookies are strictly necessary to deliver the Websites to you, you cannot refuse them.</p> <p>You can block or delete them by changing your browser settings however, as described below under the heading "How can I control cookies?".</p> </td>
    </tr>
    <tr>
        <td> <p><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Websites but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p> </td>
        <td> <p><strong>Redocly</strong></p> </td>
        <td> <p>To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"</p> </td>
    </tr>
    <tr>
        <td> <p><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective are marketing campaigns are, or to help us customize our Websites for you.</p> </td>
        <td> <p><strong>Redocly </strong></p> <p><strong>Google Analytics</strong></p>
         <p><strong>HotJar</strong>- this is a tool that we use to provide a better user experience for you and collect data used to diagnose user issues. It records and captures a user’s session so that we can monitor user actions like mouse clicks, movements, etc.</p> </td>
        <td> <p>To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"</p> <p>Alternatively, please click on the relevant opt-out link below:</p> <p>Google Analytics: https://tools.google.com/. Further information on how Google collects and uses this data can be <a href="https://developers.google.com/analytics/resources/concepts/gaConceptsTrackingOverview">found here</a>.</p><p>HotJar: <a href="https://www.hotjar.com/privacy/do-not-track/" target="_blank">https://www.hotjar.com/privacy/do-not-track/</a></p> </td>
    </tr>
    <tr>
        <td> <p><strong>Advertising cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p> </td>
        <td> <p><strong>Facebook</strong></p> <p><strong>DoubleClick</strong></p> </td>
        <td> <p>To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"</p> <p>Alternatively, please click on the relevant opt-out link below:<br /><br />Facebook: <u><a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a></u></p> <p>DoubleClick: <u><a href="https://policies.google.com/technologies/managing">https://policies.google.com/technologies/managing</a></u></p> </td>
    </tr>
    <tr>
        <td> <p><strong>Social networking cookies:</strong> These cookies are used to enable you to share pages and content that you find interesting on our Websites through third party social networking and other websites. These cookies may also be used for advertising purposes too.</p> </td>
        <td> <p><strong>Facebook</strong></p> <p><strong>Twitter</strong></p> <p><strong>LinkedIn</strong></p> </td>
        <td> <p>To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"</p> <p>Alternatively, please click on the relevant opt-out link below:</p> <p>Facebook: <u><a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a></u></p> <p>Twitter: <u><a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a></u></p> <p>LinkedIn: <u><a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out">https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out</a></u></p> </td>
    </tr>
    </tbody>
</table>

<!-- "Types of Cookies" section for mobile -->
<ul class="accordion hide-on-desktop">
    <li>
        <input type="checkbox" checked="" />
        <i></i>
        <h4>Essential website cookies</h4>
        <p>These cookies are strictly necessary to provide you with services available through our Websites and to use some of its features, such as access to secure areas.<br><br>
        <strong>Who serves these cookies</strong>: Redocly<br><br>
        <strong>How to refuse</strong>: Because these cookies are strictly necessary to deliver the Websites to you, you cannot refuse them. You can block or delete them by changing your browser settings however, as described below under the heading "How can I control cookies?".</p>
    </li>
    <li>
        <input type="checkbox" checked="" />
        <i></i>
        <h4>Performance and functionality cookies</h4>
        <p>These cookies are used to enhance the performance and functionality of our Websites but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.<br><br>
        <strong>Who serves these cookies</strong>: Redocly<br><br>
        <strong>How to refuse</strong>: To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"</p>
    </li>
    <li>
        <input type="checkbox" checked="" />
        <i></i>
        <h4>Analytics and customization cookies</h4>
        <p>These cookies collect information that is used either in aggregate form to help us understand how our Websites are being used or how effective are marketing campaigns are, or to help us customize our Websites for you.<br><br>
        <strong>Who serves these cookies</strong>: Redocly, Google Analytics, HotJar - this is a tool that we use to provide a better user experience for you and collect data used to diagnose user issues. It records and captures a user’s session so that we can monitor user actions like mouse clicks, movements, etc.<br><br>
        <strong>How to refuse</strong>: To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"<br><br>
        Alternatively, please click on the relevant opt-out link below:<br><br>
        <strong>Google Analytics</strong>: https://tools.google.com/. Further information on how Google collects and uses this data can be <a href="https://developers.google.com/analytics/resources/concepts/gaConceptsTrackingOverview" target="_blank">found here</a>.<br><br>
        <strong>HotJar</strong>: <a href="https://www.hotjar.com/legal/policies/do-not-track/" target="_blank">https://www.hotjar.com/legal/policies/do-not-track/</a></p>
    </li>
    <li>
        <input type="checkbox" checked="" />
        <i></i>
        <h4>Advertising cookies</h4>
        <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.<br><br>
        <strong>Who serves these cookies</strong>: Facebook, DoubleClick<br><br>
        <strong>How to refuse</strong>: To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"<br><br>
        Alternatively, please click on the relevant opt-out link below:<br><br>
        <strong>Facebook</strong>: <a href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a><br><br>
        <strong>DoubleClick</strong>: <a href="https://policies.google.com/technologies/managing" target="_blank">https://policies.google.com/technologies/managing</a></p>
    </li>
    <li>
        <input type="checkbox" checked="" />
        <i></i>
        <h4>Social networking cookies</h4>
        <p>These cookies are used to enable you to share pages and content that you find interesting on our Websites through third party social networking and other websites. These cookies may also be used for advertising purposes too.<br><br>
        <strong>Who serves these cookies</strong>: Facebook, Twitter, LinkedIn<br><br>
        <strong>How to refuse</strong>: To refuse these cookies, please follow the instructions below under the heading "How can I control cookies?"<br>
        Alternatively, please click on the relevant opt-out link below:<br><br>
        <strong>Facebook</strong>: <a href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a><br><br>
        <strong>Twitter</strong>: <a href="http://www.aboutads.info/choices/" target="_blank">http://www.aboutads.info/choices/</a><br><br>
        <strong>LinkedIn</strong>: <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank">https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out</a></p>
    </li>
</ul>

<h3>What about other tracking technologies, like web beacons?</h3>
<p>Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Websites or opened an e-mail that we have sent them. This allows us, for example, to monitor the traffic patterns of users from one page within our Websites to another, to deliver or communicate with cookies, to understand how whether you have come to our Websites from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of our marketing programs (e.g. email marketing campaigns). In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.</p>
<h3>Do you use Flash cookies or Local Shared Objects?</h3>
<p>Our Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention and for other site operations.</p>
<p>If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage using the tools contained in the Website Storage Settings Panel. You can also control Flash Cookies by going to the Global Storage Settings Panel and following the instructions (which may include instructions that explain, for example, how to delete existing Flash Cookies (referred to "information" on the Macromedia site), how to prevent Flash LSOs from being placed on your computer without your being asked, and (for Flash Player 8 and later) how to block Flash Cookies that are not being delivered by the operator of the page you are on at the time).</p>
<p>Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications, including, potentially, Flash applications used in connection with our services or online content.</p>
<h3>Do you serve targeted advertising?</h3>
<p>We may track and analyse both individualized usage and volume statistical information related to your use of our Websites. We also partner with third parties (such as advertisers and networks) to display advertising on our Websites and/or to manage and serve advertising on other third party sites.</p>
<p>These third parties may use cookies, web beacons, pixel tags and other similar tracking technologies to collect and use certain information about your online activities, either on our Websites, our services and/or other third party sites. This information may be used alone or in combination with information about you we obtain from other sources (like data partners) and contact details, professional information and Redocly transaction history to infer your interests and deliver you targeted advertising and marketing that are more tailored to you based on your browsing activities and inferred interests (also known as "Interest Based Advertising").</p>
<p>Our third party service providers may also use cookies or similar technologies to collect information about your visits to our Websites and/or other third party sites to measure and track the effectiveness of advertisements and our online marketing activities (for example, by collecting data on how many times you click on one of our advertisements).</p>
<h3>How can I control cookies?</h3>
<p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie table above.</p>
<p><strong>Browser Controls</strong>: You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
<p><strong>Disabling Interest Based Advertising</strong>: Most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit http://www.aboutads.info/choices/ or http://www.youronlinechoices.com.</p>
<p><strong>Opting out of tracking via your mobile device</strong>: If you are using a mobile device, you can opt out of having your mobile identifier used for certain types of Interest Based Advertising, including those performed by us, by accessing the settings in your Apple or Android mobile device and following the most recent published instructions. If you opt-out, no further data collection or tracking will occur. This means that if at a later stage, you decide to opt-in, we will not be able to continue and track you using the same ID as before and you will for all practical purposes be a new user to our system.</p>
<h3>How often will you update this Cookie Notice?</h3>
<p>We may update this Cookie Notice from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Notice regularly to stay informed about our use of cookies and related technologies.</p>
<p>The date at the top of this Cookie Notice indicates when it was last updated.</p>
<h3>Where can I get further information?</h3>
<p>If you have any questions about our use of cookies or other technologies, please email us at privacy@redoc.ly or in writing at:</p>
<p>3801 N. Capital of Texas Hwy.<br /> E-240 #72<br /> Austin, Texas 78746<br /> USA</p>

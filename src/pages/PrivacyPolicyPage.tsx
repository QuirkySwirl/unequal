import React from 'react';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-8 mx-auto prose prose-indigo sm:px-6 lg:px-8 max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last Updated: [Date]</p>

      <div className="p-4 my-4 text-red-800 bg-red-100 border-l-4 border-red-500">
        <p className="font-bold">Disclaimer:</p>
        <p>This is an auto-generated draft and not legal advice. Please review this content carefully and consult with a legal professional to ensure it meets your specific needs and complies with all applicable laws and regulations (like GDPR, CCPA, etc.) before publishing, especially regarding third-party services like advertising.</p>
      </div>

      <h2>Introduction</h2>
      <p>
        Welcome to our app! We respect your privacy and are committed to being transparent about how we handle information. This Privacy Policy explains what information, if any, is collected and how it's used.
      </p>

      <h2>Information We Do Not Collect</h2>
      <p>
        The core functionality of this application (visualizing wealth data) does not require you to provide, nor does it actively collect, any personally identifiable information (PII). We do not ask for your name, email address, location, or any other personal details to use the main features of the app. We do not use cookies for tracking your activity within the app itself.
      </p>

      <h2>Third-Party Services (Advertising)</h2>
      <p>
        To support the development and maintenance of this free application, we may display advertisements provided by third-party advertising networks, such as Google AdSense.
      </p>
      <ul>
        <li>
          These third-party vendors, including Google, use cookies (like the Google advertising cookies) to serve ads based on a user's prior visits to this website or other websites.
        </li>
        <li>
          Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.
        </li>
        <li>
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info/choices</a>.
        </li>
        <li>
          We do not control the data collection practices of these third-party services. We encourage you to review their privacy policies to understand how they collect and use your information. You can find Google's Privacy Policy <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">here</a>.
        </li>
      </ul>

      <h2>Log Data (Potential Server Logs)</h2>
      <p>
        Like many site operators, the hosting provider for this application may collect standard log information that your browser sends whenever you visit our site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address (often anonymized or generalized), browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics. This data is typically used for server administration and security purposes and is generally not personally identifiable.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        This application is not intended for use by children under the age of 13 (or the relevant age of consent in your jurisdiction). We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: [Your Contact Email or Link to Contact Form/Method]
      </p>

      <p className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700">
          Back to Home
        </Link>
      </p>
    </div>
  );
}

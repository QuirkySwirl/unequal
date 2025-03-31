import React from 'react';
import { Link } from 'react-router-dom';

export function TermsOfServicePage() {
  return (
    <div className="container px-4 py-8 mx-auto prose prose-indigo sm:px-6 lg:px-8 max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-sm text-gray-500">Last Updated: [Date]</p>

      <div className="p-4 my-4 text-red-800 bg-red-100 border-l-4 border-red-500">
        <p className="font-bold">Disclaimer:</p>
        <p>This is an auto-generated draft and not legal advice. Please review this content carefully and consult with a legal professional to ensure it meets your specific needs and complies with all applicable laws and regulations before publishing.</p>
      </div>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using this application ("the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        The App provides data visualizations and comparisons related to wealth for informational and entertainment purposes only. The data presented is based on publicly available sources and estimations, and may not be perfectly accurate or up-to-date. Net worths fluctuate, and calculation methodologies vary.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        The App and its original content (excluding user-provided data, if any, and data sourced from third parties), features, and functionality are owned by the App's creators and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. The underlying source code is made available under the MIT License.
      </p>

      <h2>4. Use License (MIT)</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on the App's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul>
        <li>modify or copy the materials for commercial purposes;</li>
        <li>attempt to decompile or reverse engineer any software contained on the App's website (beyond what is permitted by the MIT license for the source code);</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>
      <p>
        This license shall automatically terminate if you violate any of these restrictions and may be terminated by the App's creators at any time. The source code itself is governed by the terms of the MIT License, available <a href="[Link to LICENSE file on GitHub/Repo]" target="_blank" rel="noopener noreferrer">here</a> (you'll need to add the actual link).
      </p>

      <h2>5. Disclaimer of Warranties</h2>
      <p>
        The materials on the App are provided "as is". The App's creators make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, the App's creators do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        In no event shall the App's creators or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the App, even if the App's creators or an authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>

      <h2>7. Accuracy of Materials</h2>
      <p>
        The materials appearing on the App could include technical, typographical, or photographic errors. The App's creators do not warrant that any of the materials on its website are accurate, complete or current. The App's creators may make changes to the materials contained on its website at any time without notice. However, the App's creators do not make any commitment to update the materials.
      </p>

      <h2>8. Links</h2>
      <p>
        The App's creators have not reviewed all of the sites linked to its website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the App's creators of the site. Use of any such linked website is at the user's own risk.
      </p>

      <h2>9. Modifications</h2>
      <p>
        The App's creators may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction - e.g., California, USA / Your Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>

      <p className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700">
          Back to Home
        </Link>
      </p>
    </div>
  );
}

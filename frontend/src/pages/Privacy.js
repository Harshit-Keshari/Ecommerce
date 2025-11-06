import { Link } from 'react-router-dom';
import Title from '../components/Title';

const Privacy = () => {
    const getTwoMonthsAgoDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() - 2);
        return today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <div className='mt-4 mb-4 text-2xl font-semibold'><Title text1={"Privacy &"} text2={"Company Policy"}/></div>
      <p className="mb-4">
        At <strong>MyShopperSite</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website.
      </p>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4 text-gray-500">
        We collect the following types of information:
      </p>
      <ul className="list-disc ml-6 mb-4 text-gray-500">
        <li>Personal information (e.g., name, email, address, phone number)</li>
        <li>Payment details (handled securely via third-party providers)</li>
        <li>Technical data (browser type, IP address, device info)</li>
      </ul>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-4 text-gray-500">
        <li>To process and deliver your orders</li>
        <li>To communicate order updates or promotional offers</li>
        <li>To improve user experience and website performance</li>
      </ul>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">3. Cookies</h2>
      <p className="mb-4 text-gray-500">
        We use cookies to personalize content, analyze traffic, and improve performance. You can manage cookie preferences in your browser settings.
      </p>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4 text-gray-500">
        We may share necessary information with third-party services such as payment gateways or shipping partners to fulfill your order. These partners are required to comply with strict data protection policies.
      </p>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">5. Data Security</h2>
      <p className="mb-4 text-gray-500">
        We use encryption and secure technologies to protect your information. However, no online method is 100% secure, and we encourage you to take precautions when sharing data online.
      </p>

      <h2 className="text-xl ftext-gray-500 mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4 text-gray-500">
        You may access, update, or request deletion of your personal information at any time by contacting us at <Link to="/contact" className="text-blue-600">Contact</Link>.
      </p>

      <h2 className="text-xl text-gray-500 mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4 text-gray-00">
        We may update this Privacy Policy occasionally. All changes will be posted on this page with an updated revision date.
      </p>
      <p className="mt-10 mb-0 text-sm text-gray-400">Last updated: {getTwoMonthsAgoDate()}</p>
    </div>
  );
};
export default Privacy;

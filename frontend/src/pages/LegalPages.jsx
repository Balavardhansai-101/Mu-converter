import { motion } from 'framer-motion';

function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: '#6366f1' }}>{title}</h2>
      <div style={{ color: 'var(--color-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        {children}
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div style={{ paddingTop: '80px', padding: '80px 1.5rem 5rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>
          Last updated: January 1, 2025
        </p>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <LegalSection title="1. Information We Collect">
            <p>We collect only the minimum necessary information to provide our document conversion services:</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Files you upload for conversion or merging</li>
              <li style={{ marginBottom: '0.5rem' }}>Basic usage analytics (page views, conversion counts - no personal identifiers)</li>
              <li style={{ marginBottom: '0.5rem' }}>Contact form submissions (name, email, message)</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. How We Use Your Files">
            <p>Your uploaded documents are used exclusively for performing the requested conversion or merge operation. We do not:</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Read, analyze, or store the contents of your files</li>
              <li style={{ marginBottom: '0.5rem' }}>Share your files with any third parties</li>
              <li style={{ marginBottom: '0.5rem' }}>Use your files for training AI or machine learning models</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. File Retention">
            <p>All uploaded files and converted outputs are <strong style={{ color: 'var(--color-text)' }}>automatically deleted from our servers within 10 minutes</strong> of processing. We maintain no permanent copies of any user files.</p>
          </LegalSection>

          <LegalSection title="4. Cookies & Analytics">
            <p>We use minimal, privacy-respecting analytics to understand how the service is used. We do not use cookies for tracking or advertising. We do not build user profiles.</p>
          </LegalSection>

          <LegalSection title="5. Data Security">
            <p>All file transfers are encrypted in transit using industry-standard TLS encryption. Our servers are maintained with industry-standard security practices including regular updates and access controls.</p>
          </LegalSection>

          <LegalSection title="6. Contact Us">
            <p>If you have any questions about this privacy policy or our data practices, please contact us at: <strong style={{ color: '#6366f1' }}>privacy@docconverterpro.com</strong></p>
          </LegalSection>
        </div>
      </motion.div>
    </div>
  );
}

export function Terms() {
  return (
    <div style={{ paddingTop: '80px', padding: '80px 1.5rem 5rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: '0.5rem' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>
          Last updated: January 1, 2025
        </p>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <LegalSection title="1. Acceptance of Terms">
            <p>By using Document Converter Pro, you agree to these Terms of Service. If you disagree with any part of the terms, please do not use our service.</p>
          </LegalSection>

          <LegalSection title="2. Use of Service">
            <p>You may use Document Converter Pro for:</p>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Personal document conversions</li>
              <li style={{ marginBottom: '0.5rem' }}>Professional and business document processing</li>
              <li style={{ marginBottom: '0.5rem' }}>Educational purposes</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>You may <strong style={{ color: 'var(--color-text)' }}>not</strong> use this service to process illegal, harmful, or copyrighted content without proper authorization.</p>
          </LegalSection>

          <LegalSection title="3. File Size and Rate Limits">
            <p>The maximum file size is 50 MB per file. We reserve the right to implement rate limiting to prevent abuse of the service.</p>
          </LegalSection>

          <LegalSection title="4. Disclaimer of Warranties">
            <p>The service is provided "as is" without any warranties, express or implied. We do not guarantee that the conversion output will be 100% identical to the input, particularly for complex document formatting.</p>
          </LegalSection>

          <LegalSection title="5. Limitation of Liability">
            <p>Document Converter Pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
          </LegalSection>

          <LegalSection title="6. Changes to Terms">
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </LegalSection>

          <LegalSection title="7. Contact">
            <p>For questions regarding these terms: <strong style={{ color: '#6366f1' }}>legal@docconverterpro.com</strong></p>
          </LegalSection>
        </div>
      </motion.div>
    </div>
  );
}

export default Privacy;

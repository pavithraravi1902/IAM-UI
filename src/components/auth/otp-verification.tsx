// import React, { useState } from 'react';
// import QRCodeScanner from './qr';

// const OTPVerification: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [otp, setOtp] = useState<string>('');
//   const [verificationResult, setVerificationResult] = useState<any>(null);

//   const handleScan = (data: string | null) => {
//     if (data) {
//       console.log('Scanned data:', data);
//       setOtp(data);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/auth/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, otp }),
//       });

//       const result = await response.json();
//       setVerificationResult(result);
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>OTP Verification</h1>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{
//           padding: '10px',
//           width: '80%',
//           margin: '10px 0',
//           borderRadius: '5px',
//           border: '1px solid #ccc'
//         }}
//       />
//       <QRCodeScanner onScan={handleScan} />
//       {otp && <p>OTP: {otp}</p>}
//       <button
//         onClick={verifyOtp}
//         style={{
//           padding: '10px 20px',
//           borderRadius: '5px',
//           border: 'none',
//           background: '#007BFF',
//           color: '#fff',
//           cursor: 'pointer',
//           marginTop: '10px'
//         }}
//       >
//         Verify OTP
//       </button>
//       {verificationResult && (
//         <p>{verificationResult.success ? 'OTP verified successfully!' : `OTP verification failed: ${verificationResult.message}`}</p>
//       )}
//     </div>
//   );
// };

// export default OTPVerification;

import React, { useState } from 'react';
import QRCodeScanner from './qr';

const OTPVerification: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      console.log('Scanned data:', data);
      setOtp(data);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      setVerificationResult(result);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>OTP Verification</h1>
      <QRCodeScanner />
    </div>
  );
};

export default OTPVerification;


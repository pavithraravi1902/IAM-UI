// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';

// interface QRCodeScannerProps {
//   onScan: (data: string | null) => void;
// }

// const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan }) => {
//   const [scanResult, setScanResult] = useState<string | null>(null);

//   const handleScan = (result: string | null) => {
//     if (result) {
//       setScanResult(result);
//       onScan(result);
//     }
//   };

//   const handleError = (err: any) => {
//     console.error(err);
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Scan QR Code</h2>
//       <div style={{ width: '300px', margin: 'auto' }}>
//         <QrReader
//           onResult={(result, error) => {
//             if (result) {
//               handleScan(result.getText());
//             }

//             if (error) {
//               handleError(error);
//             }
//           }}
//           constraints={{ facingMode: 'environment' }}
//           containerStyle={{ width: '100%' }}
//           videoStyle={{ width: '100%' }}
//         />
//       </div>
//       {scanResult && <p>Scan Result: {scanResult}</p>}
//     </div>
//   );
// };

// export default QRCodeScanner;

import React from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = () => {
  const handleScan = (data: any) => {
    if (data) {
      console.log(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Scan QR Code</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result.getText());
          }

          if (error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode: 'environment' }}
        containerStyle={{ width: '300px', margin: 'auto' }}
        videoStyle={{ width: '100%' }}
      />
    </div>
  );
};

export default QRCodeScanner;


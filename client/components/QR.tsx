import { QRCodeSVG } from 'qrcode.react';
import { useContext } from 'react';
import { AuthContext } from '../pages/context/AuthContext';

const QR = () => {
  const { lnData } = useContext(AuthContext);
  return (
    <div style={{ textAlign: 'center' }}>
      <QRCodeSVG
        value={lnData.encoded.toLocaleUpperCase()}
        includeMargin
        size={256}
      />
      <p>
        <em>Scan the code above with an LNURL-enabled wallet</em>
      </p>
    </div>
  );
};

export default QR;

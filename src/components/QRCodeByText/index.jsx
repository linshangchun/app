import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeByText = ({ size, value, level, logo }) => {
  const sizeQRCode = size || 240;
  const sizeSettings = (sizeQRCode / 10) * 2;
  return (
    <QRCodeSVG
      value={value || HOMEPAGE}
      size={sizeQRCode}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
      level={level || 'M'} // L M Q H
      includeMargin={false}
      imageSettings={
        logo === 'none'
          ? undefined
          : {
              src: logo || LOGO,
              x: undefined,
              y: undefined,
              height: sizeSettings,
              width: sizeSettings,
              excavate: true,
            }
      }
    />
  );
};

export default QRCodeByText;

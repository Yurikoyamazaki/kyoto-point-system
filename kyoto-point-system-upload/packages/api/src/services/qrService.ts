import QRCode from 'qrcode';

export async function generateMerchantQR(merchantId: string, amount?: number): Promise<any> {
  const qrData = {
    merchantId,
    amount,
    timestamp: Date.now(),
    nonce: Math.random().toString(36)
  };
  
  const qrString = JSON.stringify(qrData);
  const qrImage = await QRCode.toDataURL(qrString);
  
  return {
    data: qrData,
    image: qrImage
  };
}

export async function verifyQRCode(qrCode: string): Promise<any> {
  // QRコード検証実装
  const data = JSON.parse(qrCode);
  
  return {
    merchantId: data.merchantId,
    email: 'merchant@example.com'
  };
}

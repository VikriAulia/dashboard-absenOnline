'use client';

import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { QrCode } from '@prisma/client';
import QRCode from 'qrcode';
import Image from 'next/image';

interface CellDownloadProps {
  data: QrCode;
}

export const CellDownload: React.FC<CellDownloadProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      setLoading(false);
      console.error(
        'Base URL is not defined. Please check your environment variables.'
      );
      return;
    }

    try {
      const url = `${baseUrl}/api/qrcode/cek/${data.key}`;
      const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/png', // Using PNG format
        quality: 1, // Relevant for JPEG/WebP, adjust as needed
        margin: 1,
        color: {
          dark: '#000000', // Dark color of the QR code
          light: '#FFFFFF' // Light background color
        },
        scale: 96
      };

      // Generate QR code data URL
      const qrCodeDataUrl = await QRCode.toDataURL(
        url,
        opts as QRCode.QRCodeToDataURLOptions
      );

      // Set the QR code data URL to state
      setQrCodeData(qrCodeDataUrl);
      setLoading(false);
    } catch (error) {
      console.error('Failed to create QR Code:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="ghost" onClick={onClick} disabled={loading}>
        <DownloadIcon className="mr-4 h-4 w-4" />
        {loading ? 'Generating...' : 'Unduh QR Code'}
      </Button>
      {qrCodeData && (
        <a
          href={qrCodeData}
          download={`qrcode-${data.id_kegiatan}-${data.id}.png`}
        >
          <Image
            src={qrCodeData}
            alt="Generated QR Code"
            width={200} // Adjust this value as needed
            height={200}
          />
        </a>
      )}
    </>
  );
};

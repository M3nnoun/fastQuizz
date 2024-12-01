"use client"
import FileUploader from '@/components/fileUploader';
import QrCodeSection from '@/components/qrCodeSection';
import React, { useState } from 'react';

function Page() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const afterSubmit = (slug?: string) => {
    if (!slug) {
      console.error("Slug is undefined or invalid");
      return;
    }
    const domain =
  typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const generatedUrl = `${domain}/quizz/${slug}`;
    console.log("Generated URL:", generatedUrl);
    setQrCodeUrl(generatedUrl);
  };
  

  return (
    <>
      {qrCodeUrl.length > 0 ? (
        <QrCodeSection qrCodeUrl={qrCodeUrl} title={''} />
      ) : (
        <FileUploader afterSubmit={afterSubmit} />
      )}
    </>
  );
}

export default Page;

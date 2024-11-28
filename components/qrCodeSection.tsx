"use client";

import { useState } from "react";
import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQRCode } from "next-qrcode";
interface QRCodeContainerProps {
  qrCodeUrl: string;
  title: string;
}

export default function QrCodeSection({
  qrCodeUrl,
  title,
}: QRCodeContainerProps) {
  const { toast } = useToast();
  const { Canvas } = useQRCode();

  const handleDownload = () => {
    // In a real application, implement the download logic here
    toast({
      title: "Download started",
      description: "Your QR code is being downloaded.",
    });
  };

  const handleShare = () => {
    // In a real application, implement the share logic here
    toast({
      title: "Share",
      description: "Sharing functionality would be implemented here.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
      <div className="w-full max-w-md transition-all duration-500 ease-in-out">
        <Card
          className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl"
        >
          <CardHeader className="bg-gradient-to-r from-primary to-green-700 text-white">
            <CardTitle className="flex items-center justify-center text-2xl font-bold">
              <QrCode className="mr-2 h-6 w-6" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <Canvas
                text={qrCodeUrl}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 350,
                  color: {
                    dark: "#14a44c",
                    light: "#FFF",
                  },
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleDownload}
              className="transition-colors duration-300 ease-in-out hover:bg-primary"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="transition-colors duration-300 ease-in-out hover:bg-green-200"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

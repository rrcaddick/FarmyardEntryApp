import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Camera, useCameraDevice, useCodeScanner, CameraPermissionStatus } from "react-native-vision-camera";

export interface VehicleInformation {
  controlNumber: string;
  licenseNumber: string;
  vehicleRegistrationNumber: string;
  vehicleDescription: string;
  make: string;
  seriesName: string;
  color: string;
  vin: string;
  engineNumber: string;
  expiryDate: string;
}

type BarcodeScannerProps = {
  onScan: (result: VehicleInformation) => void;
};

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>("not-determined");
  const device = useCameraDevice("back");

  useEffect(() => {
    const getCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
    };

    getCameraPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["pdf-417"],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const scannedResult = codes[0].value;
        if (scannedResult) {
          const [
            controlNumber,
            licenseNumber,
            vehicleRegistrationNumber,
            vehicleDescription,
            make,
            seriesName,
            color,
            vin,
            engineNumber,
            expiryDate,
          ] = scannedResult.split("%").slice(5, 15);

          onScan({
            controlNumber,
            licenseNumber,
            vehicleRegistrationNumber,
            vehicleDescription,
            make,
            seriesName,
            color,
            vin,
            engineNumber,
            expiryDate,
          });
        }
      }
    },
  });

  if (cameraPermission === "denied") {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is denied.</Text>
        <Button
          title="Request Permission"
          onPress={async () => {
            const permission = await Camera.requestCameraPermission();
            setCameraPermission(permission);
          }}
        />
      </View>
    );
  }

  if (device === null || cameraPermission !== "granted") return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device!} isActive={true} codeScanner={codeScanner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default BarcodeScanner;

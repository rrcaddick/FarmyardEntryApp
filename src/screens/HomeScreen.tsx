import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Button, Text } from "react-native";
import { Header, ChargeDisplay, ItemSelector, ShiftStatus, OptionsMenu } from "../components";
import { colors } from "../styles/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { openShift } from "../store/slices/shiftSlice";
import BarcodeScanner, { VehicleInformation } from "../components/scanning/BarcodeScanner";
import { BLEPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { BleManager } from "react-native-ble-plx";
import AddPay from "react-native-addpay";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentShift = useAppSelector((state) => state.shift.currentShift);
  const user = useAppSelector((state) => state.auth.user);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<VehicleInformation>();
  const [printer, setPrinter] = useState<any | null>(null);
  const bleManager = new BleManager();
  const [isPlateScanning, setIsPlateScanning] = useState(false);
  const [plateResult, setPlateResult] = useState<string>("");

  useEffect(() => {
    BLEPrinter.init().then(() => {
      console.log("Printer initialized");
    });

    return () => {
      bleManager.destroy();
    };
  }, []);

  const handleOpenShift = () => {
    dispatch(
      openShift({
        userId: user?.id || 0,
        startTime: new Date().toISOString(),
      })
    );
  };

  const handleScan = (result: VehicleInformation) => {
    setScanResult(result);
    setIsScanning(false);
  };

  const connectToPrinter = async () => {
    try {
      const devices = await BLEPrinter.getDeviceList();
      if (devices.length > 0) {
        await BLEPrinter.connectPrinter(devices[0].inner_mac_address);
        setPrinter(devices[0]);
      } else {
        console.log("No printers found");
      }
    } catch (error) {
      console.error("Error connecting to printer:", error);
    }
  };

  const printTicket = async () => {
    if (!printer) {
      await connectToPrinter();
    }

    if (printer && scanResult) {
      try {
        await BLEPrinter.printText(
          `Vehicle: ${scanResult.make[0]}${scanResult.make.toLowerCase().slice(1)} ${
            scanResult.vehicleDescription.split(" / ")[0]
          }\n`
        );
        await BLEPrinter.printText(`Color: ${scanResult.color.split(" / ")[0]}\n`);
        await BLEPrinter.printText(`Number Plate: ${scanResult.licenseNumber}\n`);
        await BLEPrinter.printText(`Date: ${new Date().toLocaleString()}\n`);
        console.log("Ticket printed successfully");
      } catch (error) {
        console.error("Error printing ticket:", error);
      }
    } else {
      console.log("Printer not connected or no scan result");
    }
  };

  const handlePayment = async () => {
    const addPay = new AddPay({
      version: "A01",
      appId: "wz09484b0279d59c77",
      loginMode: "LoginFree",
      userId: "00",
      userPassword: "123456",
    });

    const test = await addPay.sale({
      amt: "000000020000",
      businessOrderNo: "4",
      paymentScenario: "CASH",
      POSMode: "2",
    });

    console.log(test);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

      {currentShift ? (
        isScanning ? (
          <BarcodeScanner onScan={handleScan} />
        ) : (
          <View>
            <ChargeDisplay charge={0} />
            <Button title="Scan Vehicle" onPress={() => setIsScanning(true)} />
            {scanResult ? (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  Vehicle: {scanResult.make[0]}
                  {scanResult.make.toLowerCase().slice(1)} {scanResult.vehicleDescription.split(" / ")[0]}
                </Text>
                <Text style={styles.resultText}>Color: {scanResult.color.split(" / ")[0]}</Text>
                <Text style={styles.resultText}>Number Plate: {scanResult.licenseNumber}</Text>
                <Button title="Print Ticket" onPress={printTicket} />
                <Button title="Pay" onPress={handlePayment} />
              </View>
            ) : null}
            {plateResult ? (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Scanned Plate: {plateResult}</Text>
              </View>
            ) : null}
          </View>
        )
      ) : (
        <ShiftStatus onToggleShift={handleOpenShift} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resultText: {
    fontSize: 16,
    color: "#000",
  },
  cameraContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
});

export default HomeScreen;

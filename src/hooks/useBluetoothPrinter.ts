// import { useState, useEffect } from "react";
// import { BleManager, Device } from "react-native-ble-plx";
// // import { BluetoothTscPrinter } from "react-native-thermal-receipt-printer-image-qr";

// type VehicleInformation = {
//   make: string;
//   vehicleDescription: string;
//   color: string;
//   vehicleRegistrationNumber: string;
// };

// const useBluetoothPrinter = () => {
//   const [devices, setDevices] = useState<Device[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
//   const manager = new BleManager();

//   useEffect(() => {
//     const subscription = manager.onStateChange((state) => {
//       if (state === "PoweredOn") {
//         scanForDevices();
//         subscription.remove();
//       }
//     }, true);
//     return () => manager.destroy();
//   }, [manager]);

//   const scanForDevices = () => {
//     manager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.log(error);
//         return;
//       }
//       if (device && device.name && !devices.find((d) => d.id === device.id)) {
//         setDevices((prevDevices) => [...prevDevices, device]);
//       }
//     });
//   };

//   const connectToDevice = async (device: Device) => {
//     try {
//       await manager.stopDeviceScan();
//       const connected = await device.connect();
//       await connected.discoverAllServicesAndCharacteristics();
//       setConnectedDevice(connected);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const printTicket = async (scanResult: VehicleInformation) => {
//     if (connectedDevice && scanResult) {
//       try {
//         await BluetoothTscPrinter.connectPrinter(connectedDevice.id);

//         await BluetoothTscPrinter.printText("Vehicle Ticket\n", {
//           widthtimes: 2,
//           heighttimes: 2,
//           underline: 1,
//         });
//         await BluetoothTscPrinter.printText("----------------\n", {});
//         await BluetoothTscPrinter.printText(`Make: ${scanResult.make}\n`, {});
//         await BluetoothTscPrinter.printText(`Model: ${scanResult.vehicleDescription}\n`, {});
//         await BluetoothTscPrinter.printText(`Color: ${scanResult.color}\n`, {});
//         await BluetoothTscPrinter.printText(`Plate: ${scanResult.vehicleRegistrationNumber}\n`, {});
//         await BluetoothTscPrinter.printAndFeed(3);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("No connected device or scan result");
//     }
//   };

//   return {
//     devices,
//     connectedDevice,
//     scanForDevices,
//     connectToDevice,
//     printTicket,
//   };
// };

// export default useBluetoothPrinter;

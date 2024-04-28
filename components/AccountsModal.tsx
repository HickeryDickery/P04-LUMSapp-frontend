import React, { forwardRef, useCallback, useEffect, useState, useImperativeHandle } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/action";
import Dialog from "react-native-dialog";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { PRIMARY_COLOR } from "../constants/color";

const AccountMenu = forwardRef<BottomSheet>((props, ref) => {
  const [userData, setUserData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();





  const [snapPoints, setSnapPoints] = useState(['20%']);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const userDataArray = JSON.parse(data);
          setUserData(userDataArray);
          calculateSnapPoints(userDataArray);
        }
      } catch (error) {
        console.error("Error retrieving user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, [userData]);

  const calculateSnapPoints = (data = userData) => {
    const screenHeight = Dimensions.get('window').height;
    const itemHeight = 100; // Average height of each list item
    const maxListHeight = screenHeight * 0.8; // Max height to use
    const calculatedHeight = Math.min(data.length * itemHeight, maxListHeight) + 130;
  
    const heightPercentage = `${(calculatedHeight / screenHeight) * 100}%`;
    setSnapPoints([heightPercentage]);
  };

  const handleLogin = (data) => {
    dispatch(login(data.email, data.password));
  };

  const handleLongPressAccount = (account) => {
    setSelectedAccount(account);
    setDialogVisible(true);
  };

  const deleteAccount = async () => {
    const updatedUserData = userData.filter(
      item => item.data.user.name !== selectedAccount.data.user.name
    );
    setUserData(updatedUserData);
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
      console.log("Account deleted and userData updated in AsyncStorage");
      setDialogVisible(false);
    } catch (error) {
      console.error("Failed to delete the account from AsyncStorage:", error);
    }
  };

  const renderAccountItem = ({ item }) => (
    <TouchableOpacity
      style={styles.accountDetails}
      onPress={() => handleLogin(item)}
      onLongPress={() => handleLongPressAccount(item)}
    >
      <Image
        style={styles.avatar}
        source={{ uri: item.data.user.profile_picture?.url || "https://picsum.photos/201" }}
      />
      <Text style={styles.nameText}>{item.data.user.name}</Text>
    </TouchableOpacity>
  );

  const handleAddAccount = () => {
    navigation.navigate("Login");
  };

  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop {...backdropProps} enableTouchThrough={false} />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      handleIndicatorStyle={{ backgroundColor: PRIMARY_COLOR }}
      backgroundStyle={{ backgroundColor: "#292929" }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={{ flex: 1, zIndex: 1000, padding: 20 }}>
        <FlatList
          data={userData}
          style={{ width: "100%" }}
          renderItem={renderAccountItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.addAccountButton}
              onPress={handleAddAccount}
            >
              <Text style={[styles.addAccountText, { color: "#4ECCA3", fontSize: 60, marginBottom: 10 }]}>+</Text>
              <Text style={styles.addAccountText}>Add Account</Text>
            </TouchableOpacity>
          }
        />
      </BottomSheetView>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title style={{ color: "black" }}>Delete Account</Dialog.Title>
        <Dialog.Description style={{ color: "black" }}>
          Are you sure you want to remove this account?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
        <Dialog.Button label="Delete" onPress={deleteAccount} />
      </Dialog.Container>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  // Your existing styles here
  addAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    marginTop: -5,
    width: "100%",
  },
  addAccountText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  accountDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 0,
  },
  nameText: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default AccountMenu;

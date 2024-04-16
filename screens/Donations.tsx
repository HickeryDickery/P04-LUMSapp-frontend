import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import EventDetails from "../components/EventDetails"; implement donation details
import DonationDetails from "../components/DonationDetails";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Loader from "../components/Loader";
import { getDonations } from "../redux/action";
import { useEffect } from "react";


const Donations = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { donations, loading } = useAppSelector(
        (state: any) => state.donations || { donations: [], loading: false }
    );

    const { user } = useAppSelector((state: any) => state.auth);

    useEffect(() => {
        dispatch(getDonations());
    }, [dispatch]);

    if (loading) {
        return <Loader />;
    }

    if (!donations) {  // worst case, havent tested this
        return <Text style={{color: "red"}}>No donations available.</Text>;
    }


    return (
        <View style={styles.container}>
                    <View style={styles.search}>
                        <MaterialIcons
                            name="search"
                            size={20}
                            color="#414141"
                            style={{ alignSelf: "center" }}
                        />
                        <TextInput
                            placeholder="Search Donations"
                            placeholderTextColor={"#414141"}
                            style={{ fontSize: 13, color: "white", flex: 1 }}
                        />
                    </View>
                    {user?.role === "admin" && (
                        <TouchableOpacity
                            style={{
                                display: "flex",
                                width: "100%",
                                // height: 35,
                                backgroundColor: "#35C2C1",
                                borderRadius: 10,
                                marginBottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingVertical: 5,
                                gap: 5,
                            }}
                            onPress={() => {
                                /////////////// navigate to add donations
                                navigation.navigate("AddEvent");
                            }}
                        >
                            <MaterialIcons name="add" size={24} color="white" />
                            <Text style={{ color: "white" }}>Add Donation</Text>
                        </TouchableOpacity>
                    )}
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            width: "100%",
                        }}
                    >
                    </View>
                    {loading ? (
                        <Loader />
                    ) : (
                        <FlatList
                            style={{ width: "100%", marginTop: 10 }}
                            onRefresh={() => {
                                dispatch(getDonations());
                            }}
                            refreshing={false}
                            data={donations}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => {
                                // console.log("item", item)
                                return (
                                    <TouchableOpacity
                                        ////////// navigate to specific donations screen
                                        onPress={() => {
                                            navigation.navigate("SpecificEvent", {
                                                event: item,
                                            });
                                        }}
                                    >
                                    <DonationDetails
                                        category={item.category} // Assuming category as the title
                                        description={item.details} // Assuming details as the description
                                        date={item.createdAt} // Format createdAt date as per your requirement
                                        amountPending={item.pendingAmount} // Assuming accountNumber as one of the account details
                                        issuedBy={item.accountDetails.issuedBy} // Assuming issuedBy as one of the account details
                                    />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    )}
                </View>
    );
};

// styling for the screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        color: "#fff",
        paddingHorizontal: 15,
        justifyContent: "flex-start",
    },
    search: {
        width: "100%",
        backgroundColor: "#292626",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginVertical: 10,
    },
});

export default Donations;

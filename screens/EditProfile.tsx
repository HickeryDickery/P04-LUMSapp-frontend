import {
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    View,
    ImageBackground,
    Text,
    TextInput
} from "react-native";
import { useState, useEffect } from "react"
import { useAppSelector } from "../redux/hooks";
import { Button } from "react-native-paper";
import { Feather } from '@expo/vector-icons';

const EditProfile = ({navigation}: any) => {
    const { user }: any = useAppSelector((state) => state.auth);

    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        setUsername(user!.name)
        setBio(user!.bio)
    }, [user])

    return (
        <SafeAreaView style={styles.container}>
            <View
            style={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            >
            <Button
                onPress={() => {navigation.goBack()}}
                style={{
                    position: 'absolute',
                    left: '4%',
                }}
            >
                <Feather name="x" size={24} color="white" />
            </Button>
            <Text
                style={{
                    color: 'white',
                    fontWeight: "bold",
                    fontSize: 22,
                }}
            >Edit Profile</Text>
            <Button
                onPress={() => {navigation.goBack()}}
                style={{
                    position: 'absolute',
                    right: '4%',
                }}
            >
                <Feather name="check" size={24} color="#35C2C1" />
            </Button>
            </View>
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}
            >
            <TouchableOpacity
                style={{
                    width: '40%',
                    height: 'auto',
                    borderRadius: 100,
                    aspectRatio: 1 / 1,
                    marginTop: '8%',
                    marginBottom: '3%',
                }}
            >
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    imageStyle={{
                        borderRadius: 100,
                        aspectRatio: 1 / 1,
                        opacity: 0.55
                    }}
                    source={{
                    uri: "https://picsum.photos/201",
                    }} /*require path is for static images only*/
                >
                <Feather name="camera" size={32} color="#35C2C1" style={{
                    position: 'relative'
                }} />
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    style={{
                        color: '#35C2C1',
                        fontSize: 16,
                        fontWeight: '600'
                    }}
                >
                    Edit picture
                </Text>
            </TouchableOpacity>
            <View
                style={{
                    width: '90%',
                    marginTop: '12%',
                }}
            >
                <Text
                    style={{
                        color: '#848484',
                        fontSize: 14,
                    }}
                >
                    Name
                </Text>
                <TextInput
                    editable
                    maxLength={30}
                    value = {username}
                    onChangeText={text => setUsername(text)}
                    style={{
                        paddingVertical: 8,
                        color: 'white',
                        fontSize: 18,
                        borderBottomColor: '#848484',
                        borderBottomWidth: 1,
                    }}
                />
                <Text
                    style={{
                        color: '#848484',
                        fontSize: 14,
                        marginTop: 20
                    }}
                >
                    Bio
                </Text>
                <TextInput
                    editable
                    maxLength={30}
                    value = {bio}
                    onChangeText={text => setBio(text)}
                    style={{
                        paddingVertical: 8,
                        color: 'white',
                        fontSize: 18,
                        borderBottomColor: '#848484',
                        borderBottomWidth: 1,
                    }}
                />
            </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
  });
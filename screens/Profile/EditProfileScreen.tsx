import { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "../../components/General/Text";
import ProfileNameCircle from "../../components/Profile/ProfileNameCircle";
import FormButton from "../../components/General/Forms/FormButton";
import ChangePasswordModal from "../../components/ProfileSettings/ChangePasswordModal";
import FormTextField from "../../components/General/Forms/FormTextField";
import {
  deletePhoto,
  deleteUser,
  getStudentInfo,
  updateUserFields,
} from "../../api/user-api";
import BackButton from "../../components/General/BackButton";
import { useNavigation } from "@react-navigation/native";
import {
  validateEmail,
  validateName,
} from "../../components/General/validation";
import FormFieldAlert from "../../components/General/Forms/FormFieldAlert";
import {
  getUserInfo,
  setUserInfo,
  getJWT,
  getStudentProfilePhoto,
  updateStudentInfo,
  getLoginToken,
  getUserId,
} from "../../services/storage-service";
import ShowAlert from "../../components/General/ShowAlert";
import errorSwitch from "../../components/General/error-switch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native";

const ProfileInput = ({ label, required, error, testId, ...props }) => (
  <View className="mb-8">
    {}
    <Text className="mb-1 ml-[10px] text-[18px] font-bold leading-[23.4px] text-[#28363E]">
      {label}
      {required ? <Text className="text-[#CC2B2B]">*</Text> : null}
    </Text>

    {}
    <TextInput
      accessibilityLabel={testId}
      placeholderTextColor="#8FA0AA"
      className={`h-[59px] w-[326px] self-center rounded-[8px] border bg-[#FDFEFF] px-[16px] py-[10px] text-[16px] text-[#28363E] ${
        error ? "border-[#CC2B2B]" : "border-[#C1CFD7]"
      }`}
      {...props}
    />

    {}
    {!!error && (
      <Text className="mt-1 text-[14px] text-[#CC2B2B]">{error}</Text>
    )}
  </View>
);

/**
 * Edit profile screen
 * @returns {React.Element} Component for the edit profile screen
 */
export default function EditProfileScreen() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fetchedFirstName, setFetchedFirstName] = useState("");
  const [fetchedLastName, setFetchedLastName] = useState("");
  const [fetchedEmail, setFetchedEmail] = useState("");
  const [changedFields, setChangedFields] = useState({});
  const [emailAlert, setEmailAlert] = useState("");
  const [firstNameAlert, setFirstNameAlert] = useState("");
  const [lastNameAlert, setLastNameAlert] = useState("");
  const [photo, setPhoto] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setChangedFields({
      firstName: firstName !== fetchedFirstName ? firstName : undefined,
      lastName: lastName !== fetchedLastName ? lastName : undefined,
      email: email !== fetchedEmail ? email : undefined,
    });
  }, [
    firstName,
    lastName,
    email,
    fetchedFirstName,
    fetchedLastName,
    fetchedEmail,
  ]);

  useEffect(() => {
    let validationError = "";
    validationError = validateName(firstName, "Nome"); // First name
    setFirstNameAlert(validationError);
  }, [firstName]);

  useEffect(() => {
    let validationError = "";
    validationError = validateName(lastName, "Sobrenome"); // Last name
    setLastNameAlert(validationError);
  }, [lastName]);

  useEffect(() => {
    const validationError = validateEmail(email);
    setEmailAlert(validationError);
  }, [email]);

  /**
   * Validates the input fields
   */
  function validateInput() {
    return (
      firstNameAlert === "" &&
      lastNameAlert === "" &&
      emailAlert === "" &&
      (changedFields.firstName !== undefined ||
        changedFields.lastName !== undefined ||
        changedFields.email !== undefined)
    );
  }

  /**
   * Fetches the user profile
   */
  const getProfile = async () => {
    try {
      const fetchedProfile = await getUserInfo();
      if (fetchedProfile !== null) {
        setId(fetchedProfile.id);
        setFetchedFirstName(fetchedProfile.firstName);
        setFetchedLastName(fetchedProfile.lastName);
        setFetchedEmail(fetchedProfile.email);
        setFirstName(fetchedProfile.firstName);
        setLastName(fetchedProfile.lastName);
        setEmail(fetchedProfile.email);
        const photo = await getStudentProfilePhoto();
        setPhoto(photo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const runAsyncFunction = async () => {
        try {
          await getProfile();
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      runAsyncFunction();
    }, []),
  );

  /**
   * persists the changed user info
   */
  const saveUserInfo = async () => {
    if (!validateInput()) {
      return;
    }

    const fetchedProfile = {
      id: id,
      firstName: fetchedFirstName,
      lastName: fetchedLastName,
      email: fetchedEmail,
    };

    const updatedProfile = {
      ...fetchedProfile,
      ...(changedFields.firstName !== undefined
        ? { firstName: changedFields.firstName }
        : {}),
      ...(changedFields.lastName !== undefined
        ? { lastName: changedFields.lastName }
        : {}),
      ...(changedFields.email !== undefined
        ? { email: changedFields.email }
        : {}),
    };

    try {
      const LOGIN_TOKEN = await getJWT();
      await updateUserFields(id, changedFields, LOGIN_TOKEN);
      await setUserInfo(updatedProfile);
      getProfile();
    } catch (error) {
      ShowAlert(errorSwitch(error));
    }
  };

  const deleteAccountAlert = () =>
    Alert.alert(
      "Deletar conta",
      "Tem certeza de que deseja excluir sua conta?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        { text: "Sim", onPress: deleteAccount },
      ],
    );

  const deleteAccount = async () => {
    try {
      const LOGIN_TOKEN = await getJWT();
      const USER_INFO = "@userInfo";
      await AsyncStorage.multiRemove([LOGIN_TOKEN, USER_INFO]);
      await deleteUser(id, LOGIN_TOKEN);
      navigation.navigate("LoginStack");
    } catch (error) {
      ShowAlert(errorSwitch(error));
    }
  };

  const removeImage = async () => {
    setPhoto("");
    var profile = getStudentInfo();
    updateStudentInfo({ ...profile, photo: "" });
    const userId = await getUserId();
    await deletePhoto(userId, await getLoginToken());
  };

  return (
    <SafeAreaView className="bg-secondary">
      <View className="h-full">
        <View>
          <View className="relative mx-4 mb-6 mt-12 flex flex-row items-center justify-center">
            {/* Back button */}
            <BackButton
              onPress={() => navigation.navigate("ProfileHome")}
              className="absolute left-0"
            />

            {/* Title */}
            <Text className="-ml-40 font-sans text-[20px] leading-[26px] text-[#141B1F]">
              Editar Perfil
            </Text>
          </View>

          <View className="flex flex-row items-center justify-center gap-[30px] px-[30px] py-[30px]">
            {/* Profile image */}
            {photo ? (
              <Image
                source={{ uri: photo }}
                className="h-[80px] w-[80px] rounded-[60px] border-[3px] border-[#FDFEFF] bg-[#D8EFF3]"
              />
            ) : (
              <View className="h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-[60px] bg-[#D8EFF3]">
                <ProfileNameCircle
                  firstName={fetchedFirstName}
                  lastName={fetchedLastName}
                  className="border-[3px] border-[#FDFEFF] bg-[#D8EFF3]"
                />
              </View>
            )}
            {/* Edit image */}
            <View className="flex flex-col items-center justify-center gap-[8px]">
              <TouchableOpacity
                className="h-[40px] w-[180px] items-center justify-center self-center rounded-[8px] border-[2px] border-[#35A1B1] bg-[#FDFEFF]"
                onPress={() => navigation.navigate("Camera")}
              >
                <Text className="font-sans text-[16px] font-bold text-[#28363E]">
                  Trocar Imagem
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={removeImage}>
                <Text className="text-center text-[18px] leading-[22px] text-[#166276] underline">
                  Remover imagem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex w-screen flex-col px-8 pt-8">
          <ProfileInput
            label="Nome"
            required
            testId="firstName"
            placeholder="Insira sua nome"
            value={firstName}
            onChangeText={(v) => {
              setFirstName(v);
              validateName(v);
            }}
            autoCapitalize="words"
            error={firstNameAlert}
          />
          <ProfileInput
            label="Sobrenome"
            required
            testId="lastName"
            placeholder="Insira sua sobrenome"
            value={lastName}
            onChangeText={(v) => {
              setLastName(v);
              validateName(v);
            }}
            autoCapitalize="words"
            error={lastNameAlert}
          />
          <ProfileInput
            label="E-mail"
            required
            testId="email"
            placeholder="Insira sua e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              validateEmail(v);
            }}
            error={emailAlert}
          />
        </View>

        <View className="pt-12">
          <FormButton
            className={`h-[50px] w-[326px] items-center justify-center self-center rounded-[8px] ${
              !validateInput() ? "bg-[#A0C1C7]" : "bg-primary_custom"
            }`}
            onPress={saveUserInfo}
            disabled={!validateInput()}
            style={{ opacity: 1 }}
          >
            Salvar alterações
          </FormButton>

          <Text
            className="mt-4 text-center font-sans-bold text-base underline"
            style={{ color: "red" }}
            onPress={deleteAccountAlert}
          >
            Excluir minha conta
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

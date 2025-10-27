import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface PasswordEyeProps {
  showPasswordIcon: boolean;
  toggleShowPassword: () => void;
}
/**
 * Icon component for the eye besides passwords to toggle if text can be seen by user
 * @param {Object} props Should contain the following properties
 * - showPasswordIcon: Boolean
 * - toggleShowPassword: Function
 */
const PasswordEye = ({ showPasswordIcon, toggleShowPassword }: PasswordEyeProps) => {
  return (
    <Pressable
      onPress={toggleShowPassword}
    >
      <MaterialCommunityIcons
        name={showPasswordIcon ? "eye-off" : "eye"}
        size={24}
        color="gray"
      />
    </Pressable>
  );
}

export default PasswordEye;

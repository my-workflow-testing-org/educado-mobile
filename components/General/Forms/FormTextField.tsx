import {
  View,
  TextInput,
  KeyboardTypeOptions,
  Text,
} from "react-native";
import PasswordEye from "@/components/General/Forms/PasswordEye";
import { useState } from "react";

interface FormTextFieldProp {
  autoComplete?:
    | "off"
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number"
    | "cc-exp"
    | "cc-csc"
    | "cc-exp-month"
    | "cc-exp-year"
    | "additional-name"
    | "address-line1"
    | "address-line2"
    | "birthdate-day"
    | "birthdate-full"
    | "birthdate-month"
    | "birthdate-year"
    | "country"
    | "current-password"
    | "family-name"
    | "given-name"
    | "honorific-prefix"
    | "honorific-suffix"
    | "new-password"
    | "one-time-code"
    | "organization"
    | "url"
    | undefined;
  bordered?: boolean;
  error?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  label?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
  showPasswordEye?: boolean;
}

const FormTextField = ({
  autoComplete,
  bordered,
  error,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value,
  required,
  showPasswordEye
}: FormTextFieldProp) => {
  const [showPassword, setShowPassword] = useState(showPasswordEye ?? false);

  return (
    <View>
      <View className="relative flex flex-row flex-wrap">
        {/* Text size above input fields on login and registration */}
        <Text className="ml-2 text-body-regular">{label ?? ""}</Text>
        <Text className="ml-1 text-surfaceDefaultRed text-body-regular">
          {required ? "*" : ""}
        </Text>
        {(showPasswordEye ?? false) ? (
          <View
            className={
              "absolute top-12 right-[15] z-10 ml-auto"
            }
          >
            <PasswordEye
              showPasswordIcon={showPassword}
              toggleShowPassword={() => {
                setShowPassword(!showPassword);
              }}
            />
          </View>
        ) : null}
      {/* Various properties for text input fields */}
      <TextInput
        className={`w-full rounded-lg bg-surfaceSubtleGrayscale py-4 pl-[10px] text-subtitle-regular ${
          bordered && !error ? "border border-projectGray" : ""
        } ${error ? "border border-b-borderDefaultRed bg-surfaceSubtleRed" : ""}`}
        placeholder={placeholder ?? ""} // Placeholder text to be displayed
        keyboardType={keyboardType} // Keyboard type (e.g. numeric, email-address, etc.)
        autoComplete={autoComplete} // Whether to enable auto-completion
        secureTextEntry={showPassword} // Whether to mask the input (for passwords, etc.)
        onChangeText={(value) => onChangeText?.(value)} // Callback function to be called when the text changes
        value={value} // Value of the input
      />
      </View>
    </View>
  );
};

export default FormTextField;

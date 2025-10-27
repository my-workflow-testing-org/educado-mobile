import { View, Text } from "react-native";

interface FormFieldAlertInterface {
  label: string;
  success?: boolean;
}

/**
 * Component for showing an alert below a form field
 * @param {Object} props should contain the following properties:
 * - label: String
 * - success: Boolean
 */
const FormFieldAlert = ({ label, success }: FormFieldAlertInterface) => {
  return (
    <View className="flex-row items-center">
      {success ? (
        <Text className="text-surfaceDefaultGreen text-footnote-regular-caps">
          {label}
        </Text>
      ) : (
        <Text className="text-textLabelRed text-footnote-regular-caps">
          {label}
        </Text>
      )}
    </View>
  );
};

export default FormFieldAlert;

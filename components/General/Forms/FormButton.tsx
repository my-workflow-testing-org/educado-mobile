import { View, Text, TouchableOpacity } from "react-native";

interface FormButtonTypes {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: object[];
}

const FormButton = ({
  children,
  disabled,
  onPress,
  style,
}: FormButtonTypes) => {
  return (
    <>
      <View>
        <TouchableOpacity
          className={
            "rounded-xl px-4 py-3 " +
            (disabled ? "bg-surfaceDisabledGrayscale" : "bg-surfaceDefaultCyan")
          }
          style={style ?? null}
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            className={
              "text-center text-body-bold " +
              (disabled
                ? "text-greyscaleTexticonDisabled"
                : "text-textNegativeGrayscale")
            }
          >
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FormButton;

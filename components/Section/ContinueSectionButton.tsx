import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

/**
 * Renders a button component for continuing a section.
 * @param {Function} onPress - The function to be called when the button is pressed.
 * @returns {TSX.Element} - The rendered component.
 */

export type ContinueSectionButtonProps = {
  onPress: () => void;
};

const ContinueSectionButton = ({
  onPress,
}: ContinueSectionButtonProps) => {
  return (
    <View className="h-[70] w-[100%] self-center">
      <TouchableOpacity
        className="flex w-[100%] bg-bgprimary_custom"
        style={{borderRadius:15}}
        onPress={onPress}
      >
        <View className="flex-row items-center justify-center p-4">
          <Text className="mr-2 font-montserrat-bold text-[18px] text-projectWhite">
            Começar curso
          </Text>
          <MaterialCommunityIcons
            testID="play-circle-outline"
            name="play-circle-outline"
            size={20}
            color="white"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { ContinueSectionButton }

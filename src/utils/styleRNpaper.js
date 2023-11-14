import { MD3LightTheme as DefaultTheme} from "react-native-paper";
import React, { useState } from "react";

import { newFetchCurrentData } from "../screens/NEWDB/supabaseFunctions";

export const RNtheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: bookColor,
    },
};
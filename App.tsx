import get from "lodash/get";
import merge from "lodash/merge";
import React from "react";
import { Button } from "react-native";
import { ToastProvider, useToast } from "react-native-styled-toast";
import styled, { ThemeProvider } from "styled-components/native";
import { color, ColorProps } from "styled-system";

const modes = ["default", "dark"];

const theme = {
  space: {
    "0": "0",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  },
  colors: {
    text: "#0A0A0A",
    background: "#FFF",
    border: "#E2E8F0",
    muted: "#F0F1F3",
    success: "#7DBE31",
    error: "#FC0021",
    modes: {
      dark: {
        text: "#FFF",
        background: "#141414",
        border: "#403A3A",
        muted: "#373636",
        success: "#7DBE31",
        error: "#FC0021"
      }
    }
  }
};

const Wrapper = styled.View<ColorProps>`
  ${color};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container: React.FC<{ toggleMode: () => void }> = ({ toggleMode }) => {
  const { toast } = useToast();
  return (
    <Wrapper bg="background">
      <Button
        onPress={() =>
          toast({
            message: "Woo! This is a success toast.",
            duration: 0,
            bg: "muted",
            closeButtonBgColor: "background"
          })
        }
        title="Show Success Toast"
      />
      <Button
        onPress={() =>
          toast({
            message: "Boo! This is an error toast.",
            intent: "ERROR",
            duration: 0,
            bg: "muted",
            closeButtonBgColor: "background"
          })
        }
        title="Show Error Toast"
      />
      <Button onPress={toggleMode} title="Toggle Dark Mode" />
    </Wrapper>
  );
};

export default function App() {
  const getTheme = mode =>
    merge({}, theme, {
      colors: get(theme.colors.modes, mode, theme.colors)
    });

  const [mode, setMode] = React.useState(modes[0]);

  const newTheme = getTheme(mode);

  const toggleMode = () => {
    const i = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[i]);
  };

  return (
    <ThemeProvider theme={newTheme}>
      <ToastProvider>
        <Container toggleMode={toggleMode} />
      </ToastProvider>
    </ThemeProvider>
  );
}

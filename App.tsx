import get from "lodash/get";
import merge from "lodash/merge";
import React from "react";
import { Button } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { color, ColorProps } from "styled-system";
import ToastProvider, { ToastContext } from "./src/Context/index";

const modes = ["default", "dark"];

const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
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

class Container extends React.Component {
  // const { toast } = useToast();
  render() {
    return (
      <Wrapper bg="background">
        <ToastContext.Consumer>
          {({ toast }) => {
            return (
              <React.Fragment>
                <Button
                  onPress={() =>
                    toast({
                      message: "Woo! This is a success toast."
                    })
                  }
                  title="Show Success Toast"
                />
              </React.Fragment>
            );
          }}
        </ToastContext.Consumer>
      </Wrapper>
    );
  }
}

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

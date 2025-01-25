import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface BaseButtonProps extends ButtonProps {}

const BaseButton: React.FC<BaseButtonProps> = ({ children, ...props }) => {
  const hoverBg = useColorModeValue("black", "white");
  const activeBg = useColorModeValue("blue.700", "blue.700");
  const textColor = useColorModeValue("black", "white");
  const activeTextColor = useColorModeValue("white", "black");
  const borderColor = useColorModeValue("black", "white");

  return (
    <Button
      bg={"none"}
      color={textColor}
      border={"solid 1px"}
      borderColor={borderColor}
      _hover={{
        bg: hoverBg,
        transform: "scale(1.05)",
        boxShadow: "lg",
        color: activeTextColor,
      }}
      p={"15px"}
      _active={{
        bg: activeBg,
        transform: "scale(0.95)",
        color: activeTextColor,
      }}
      transition="all 0.2s ease-in-out"
      {...props}
    >
      {children}
    </Button>
  );
};

export default BaseButton;

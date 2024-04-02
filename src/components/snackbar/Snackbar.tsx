import React from "react";
import { Snackbar } from "react-native-paper";

export default function SnackbarElement(props: {
  visible: boolean;
  onDismissSnackBar: () => void;
  label: string;
  labelColor: string;
  takeAction: () => void;
  backgroundColor: string;
  message: string;
}) {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      action={{
        label: props.label,
        labelStyle: { color: props.labelColor },
        onPress: () => {
          props.takeAction();
        },
      }}
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.message}
    </Snackbar>
  );
}

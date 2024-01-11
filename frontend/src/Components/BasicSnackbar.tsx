import { Snackbar, Alert } from "@mui/material"
import React from "react";

type setFunctionType = (newValue: boolean) => void;

interface BasicSnackbarProps {
  isVariable: boolean;
  severity: any;
  message: string;
  setIsVariable: (value: boolean) => void;
}

function BasicSnackbar({
  isVariable,
  severity,
  message,
  setIsVariable,
}: BasicSnackbarProps) {
    return (
      <Snackbar open={isVariable} autoHideDuration={6000} onClose={() => { setIsVariable(false) }}>
        <Alert onClose={() => { setIsVariable(false) }} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    )
}

export default BasicSnackbar;
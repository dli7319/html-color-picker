import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

interface ColorConverterInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorConverterInput({
  label,
  value,
  onChange,
}: ColorConverterInputProps) {
  return (
    <InputGroup>
      <FloatingLabel label={label}>
        <Form.Control type="text" value={value} onChange={onChange} />
      </FloatingLabel>
      <InputGroup.Text>
        <sl-copy-button value={value}></sl-copy-button>
      </InputGroup.Text>
    </InputGroup>
  );
}

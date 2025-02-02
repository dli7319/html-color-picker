import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "./styles/ColorConverter.module.css";

interface ColorConverterInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  copiedTimeout?: number;
}

export function ColorConverterInput({
  label,
  value,
  onChange,
  copiedTimeout = 1000,
}: ColorConverterInputProps) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), copiedTimeout);
  };
  return (
    <div className="d-flex">
      <InputGroup>
        <FloatingLabel label={label} className="flex-grow-1">
          <Form.Control type="text" value={value} onChange={onChange} />
        </FloatingLabel>
        <InputGroup.Text>
          <CopyToClipboard text={value} onCopy={onCopy}>
            <i
              className={`bi bi-clipboard2 ${styles.copyIcon}`}
              hidden={copied}
            ></i>
          </CopyToClipboard>
          <i className={`bi bi-check ${styles.copyIcon}`} hidden={!copied}></i>
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}

import React from "react";

import other_tools from "./other_tools.json";

export default function OtherTools({
  className
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <h5>Other Tools</h5>
      <ul>
        {Object.entries(other_tools).map(([key, value]) => (
          <li key={key}>
            <a href="{value}">{key}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

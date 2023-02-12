import React from "react";


export default function ColorInterpolation({
  className
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <h5>Color Interpolation</h5>
      <table className="table mb-0">
        <tbody>
          <tr>
            <td>
              <div className="color-interp-color-selection color-interp-left-color">
              </div>
            </td>
            <td>
              <div className="color-interp-color-selection color-interp-right-color">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table color-interp-table mb-0">
        <tbody>
          <tr>
            <th>
              RGB
            </th>
            <td>
              <div className="color-interp-gradient color-interp-gradient-rgb"></div>
            </td>
          </tr>
          <tr>
            <th>
              HSL
            </th>
            <td>
              <div className="color-interp-gradient color-interp-gradient-hsl"></div>
            </td>
          </tr>
          <tr>
            <th>
              HSL*
            </th>
            <td>
              <div className="color-interp-gradient color-interp-gradient-hslflip"></div>
            </td>
          </tr>
          <tr>
            <th>
              LCH
            </th>
            <td>
              <div className="color-interp-gradient color-interp-gradient-lch"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

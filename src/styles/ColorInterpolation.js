import { css } from 'lit';
export const styles = css`
.color-selection {
    width: 2rem;
    height: 2rem;
    background-color: red;
    border-radius: 10%;
    margin: 0 auto;
}

.color-selection.rightColor {
    background-color: white;
}

.color-selection.active {
    border: black dashed 0.2rem;
}

.gradient {
    width: 100%;
    height: 2rem;
    background-image: linear-gradient(to right, red, white);
    ;
}

.table th {
    width: 1rem;
}
`;
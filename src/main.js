import "./style.css";

const root = document.querySelector("#root");
import { render } from "./utils/renderUtils";
import setup from "./utils/setup";
import Data from "./data.json";

render(root);
setup();

console.log(Data);

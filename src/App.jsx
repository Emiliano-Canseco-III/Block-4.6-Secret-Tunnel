import { useAuth } from "./AuthContext";
import Entrance from "./Entrance";
import Tablet from "./Tablet";
import Tunnel from "./Tunnel";

export default function App() {
  const { location } = useAuth();
  let content;

  if (location === "TUNNEL") {
    content = <Tunnel />;
  } else if (location === "TABLET") {
    content = <Tablet />;
  } else {
    content = <Entrance />;
  }

  return <div className="App">{content}</div>;
}

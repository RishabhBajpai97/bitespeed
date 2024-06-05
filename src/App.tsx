import Builder from "./components/Builder";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Builder />
      <Toaster
        toastOptions={{
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
        }}
      />
    </>
  );
}

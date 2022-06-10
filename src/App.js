import "./styles.css";
import "share-api-polyfill";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Color from "./components/color";
import React, { Suspense, useState } from "react";
import Shoe from "./components/shoe";
import { getColors, shareLink } from "./utils/helpers";
// import Car from "./components/car";
// import ShoeTwo from "./components/shoeTwo";

const App = React.memo(() => {
  // const [modelType, setModelType] = useState("Shoe");
  const [counterExport, setCounterExport] = useState(0);
  const [selected, setSelected] = useState("");
  const [colors, setColors] = useState(() => {
    return getColors();
  });

  const handleSelect = (itemSelected) => {
    setSelected(itemSelected);
  };

  const handleColor = (color) => {
    const copyColors = { ...colors };
    copyColors[selected] = color;

    setColors(copyColors);
  };

  return (
    <>
      <h1>Design my shoe</h1>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Shoe
            colors={colors}
            selected={selected}
            handleSelect={handleSelect}
            counterExport={counterExport}
          />
          <Environment preset="city" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={1.5}
            far={0.8}
          />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
      <Color
        color={colors[selected] || "white"}
        handleExport={(type = "") => {
          if (type === "export") {
            setCounterExport(counterExport + 1);
          } else {
            const urlColors = btoa(JSON.stringify(colors));
            const urlShare = window.location.origin + "?shoe=" + urlColors;
            shareLink({
              title: "My shoe",
              text: "This is my Shoe",
              url: urlShare
            });
          }
        }}
        handleColor={handleColor}
      />
    </>
  );
});

export default App;

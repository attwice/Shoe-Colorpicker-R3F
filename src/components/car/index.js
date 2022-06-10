import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("model.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        scale={[0.1, 0.1, 0.1]}
        onPointerDown={(e) => {
          e.stopPropagation();
          console.log(e.object.material.name);
          // handleSelect(e.object.material.name);
        }}
      >
        <mesh
          geometry={nodes.Cylinder018_Cylinder007.geometry}
          material={materials.Car}
          material-color={props.color}
        />
        <mesh
          geometry={nodes.Cylinder018_Cylinder007_1.geometry}
          material={materials.Windshield}
        />
      </group>
    </group>
  );
}

// useGLTF.preload(
//   'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/zombie-car/model.gltf'
// )

import * as THREE from "three";
import { proxy } from "valtio";
import React from "react";

export const damp = THREE.MathUtils.damp;
export const state = proxy({
  clicked: null,
  urls: ["../1.jpeg", "../1.jpeg"],
});

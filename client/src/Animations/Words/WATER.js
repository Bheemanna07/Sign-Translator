export const WATER = (ref) => {
  let animations = [];

  // Make “W” shape with three fingers (simplified)
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/8, "+"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", -Math.PI/8, "-"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Move near mouth
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/4, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

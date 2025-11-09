export const EAT = (ref) => {
  let animations = [];

  // Bring fingers to mouth
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Pause moment
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

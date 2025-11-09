export const PEN = (ref) => {
  let animations = [];

  // Mimic writing with right hand
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/5, "+"]);
  ref.animations.push(animations);

  // Small wrist writing motion
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/10, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

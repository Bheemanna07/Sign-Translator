export const BYE = (ref) => {
  let animations = [];

  // Raise hand and wave
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);
  ref.animations.push(animations);
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

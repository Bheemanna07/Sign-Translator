export const HE = (ref) => {
  let animations = [];

  // Point slightly to the right (male gesture)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/7, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/8, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

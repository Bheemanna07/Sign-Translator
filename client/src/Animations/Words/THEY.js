export const THEY = (ref) => {
  let animations = [];

  // Point to side
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/4, "+"]);
  ref.animations.push(animations);

  // Sweep motion to right
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/3, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

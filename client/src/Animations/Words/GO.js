export const GO = (ref) => {
  let animations = [];

  // Push hand forward
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Extend fully
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/3, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

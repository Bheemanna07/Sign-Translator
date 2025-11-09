export const CHILD = (ref) => {
  let animations = [];

  // Lower right hand downward motion
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/4, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Small pat down
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

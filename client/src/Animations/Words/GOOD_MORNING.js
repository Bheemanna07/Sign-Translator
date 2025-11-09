export const GOOD_MORNING = (ref) => {
  let animations = [];

  // Hand from chest outward + slight head lift
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/4, "+"]);
  animations.push(["mixamorigNeck", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigNeck", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

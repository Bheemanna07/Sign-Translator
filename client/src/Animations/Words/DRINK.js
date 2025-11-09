export const DRINK = (ref) => {
  let animations = [];

  // Mimic drinking from cup
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/2.5, "+"]);
  ref.animations.push(animations);

  // Tilt back a bit
  animations = [];
  animations.push(["mixamorigHead", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigHead", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

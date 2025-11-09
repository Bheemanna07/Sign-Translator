export const THANK_YOU = (ref) => {
  let animations = [];

  // Move hand from chin outward
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/4, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/3, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

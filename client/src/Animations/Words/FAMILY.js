export const FAMILY = (ref) => {
  let animations = [];

  // Make small circle with both hands (family)
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/5, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/5, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/5, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI/5, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

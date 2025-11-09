export const WORK = (ref) => {
  let animations = [];

  // Hands hitting each other slightly (symbol for work)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/8, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/5, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", -Math.PI/5, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

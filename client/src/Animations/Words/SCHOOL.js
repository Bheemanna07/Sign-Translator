export const SCHOOL = (ref) => {
  let animations = [];

  // Both hands like clapping (symbolic for learning)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "x", Math.PI/10, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

export const SAD = (ref) => {
  let animations = [];

  // Head drops slightly
  animations.push(["mixamorigHead", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Hands move down a bit
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/8, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI/8, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigHead", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

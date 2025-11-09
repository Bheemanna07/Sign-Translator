export const STAND = (ref) => {
  let animations = [];

  // Straighten posture
  animations.push(["mixamorigSpine", "rotation", "x", -Math.PI/20, "-"]);
  animations.push(["mixamorigHips", "position", "y", 0.05, "+"]);
  ref.animations.push(animations);

  // Hands down
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/10, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigHips", "position", "y", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

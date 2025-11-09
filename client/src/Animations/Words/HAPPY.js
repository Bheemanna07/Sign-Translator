export const HAPPY = (ref) => {
  let animations = [];

  // Hands move upward with smiling motion
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigHead", "rotation", "x", -Math.PI/12, "-"]);
  ref.animations.push(animations);

  // Slight bounce
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", Math.PI/30, "+"]);
  animations.push(["mixamorigSpine", "rotation", "x", -Math.PI/30, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigHead", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigSpine", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

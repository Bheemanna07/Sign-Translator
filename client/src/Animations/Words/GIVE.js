export const GIVE = (ref) => {
  let animations = [];

  // Both hands forward (offering motion)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  // Small push outward
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/4, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

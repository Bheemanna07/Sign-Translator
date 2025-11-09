export const SIT = (ref) => {
  let animations = [];

  // Both arms lower slightly (indicating sit)
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/4, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", Math.PI/4, "+"]);
  ref.animations.push(animations);

  // Small downward movement
  animations = [];
  animations.push(["mixamorigHips", "position", "y", -0.05, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigHips", "position", "y", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

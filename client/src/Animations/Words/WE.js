export const WE = (ref) => {
  let animations = [];

  // Move hand from right chest to left chest
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

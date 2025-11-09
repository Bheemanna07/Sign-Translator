export const COME = (ref) => {
  let animations = [];

  // Hand motion: “come here”
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  // Pull motion inward
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/8, "+"]);
  ref.animations.push(animations);

  // Repeat small gesture
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

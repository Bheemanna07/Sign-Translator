export const LOVE = (ref) => {
  let animations = [];

  // Both arms cross over chest (love gesture)
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/3, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/5, "-"]);
  ref.animations.push(animations);

  // Hold briefly
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/50, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

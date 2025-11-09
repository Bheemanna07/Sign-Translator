export const GOOD_NIGHT = (ref) => {
  let animations = [];

  // Hand near cheek (sleep gesture)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigHead", "rotation", "x", Math.PI/12, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigHead", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

export const PLEASE = (ref) => {
  let animations = [];

  // Palm on chest, circular motion
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);
  ref.animations.push(animations);

  // Small circular chest motion
  animations = [];
  animations.push(["mixamorigSpine2", "rotation", "y", Math.PI/15, "+"]);
  ref.animations.push(animations);
  animations = [];
  animations.push(["mixamorigSpine2", "rotation", "y", -Math.PI/15, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

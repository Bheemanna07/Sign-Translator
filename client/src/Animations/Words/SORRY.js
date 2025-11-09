export const SORRY = (ref) => {
  let animations = [];

  // Fist on chest, circular motion
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/2.2, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigSpine2", "rotation", "y", Math.PI/10, "+"]);
  ref.animations.push(animations);
  animations = [];
  animations.push(["mixamorigSpine2", "rotation", "y", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

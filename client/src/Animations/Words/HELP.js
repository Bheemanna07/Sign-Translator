export const HELP = (ref) => {
  let animations = [];

  // Left hand flat, right hand thumbs up above it
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/3, "+"]);
  ref.animations.push(animations);

  // Slight upward motion (lift)
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/10, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

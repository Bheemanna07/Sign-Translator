export const WAIT = (ref) => {
  let animations = [];

  // Both hands raised slightly, palms open
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/8, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/6, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  // Gentle shake
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI/20, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", -Math.PI/20, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

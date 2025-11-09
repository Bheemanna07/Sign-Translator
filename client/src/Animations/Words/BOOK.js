export const BOOK = (ref) => {
  let animations = [];

  // Both hands mimic opening a book
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI/4, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

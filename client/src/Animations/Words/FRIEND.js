export const FRIEND = (ref) => {
  let animations = [];

  // Both index fingers link (friend gesture)
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", -Math.PI/3, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigLeftHandIndex1", "rotation", "z", -Math.PI/3, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "z", 0, "+"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigLeftHandIndex1", "rotation", "z", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

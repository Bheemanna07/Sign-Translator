export const FOOD = (ref) => {
  let animations = [];

  // Hand pinched and brought to mouth (eating gesture)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/4, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/4, "+"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/5, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

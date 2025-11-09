export const OKAY = (ref) => {
  let animations = [];

  // Make 'O' shape with thumb and index
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/3, "+"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/4, "+"]);
  ref.animations.push(animations);

  // Show gesture forward
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/5, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

export const TAKE = (ref) => {
  let animations = [];

  // Hand moves out (grabbing)
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  // Curl fingers in
  animations = [];
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/6, "+"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/6, "+"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", Math.PI/6, "+"]);
  ref.animations.push(animations);

  // Pull back toward chest
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandRing1", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

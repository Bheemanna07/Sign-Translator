export const PLEASE = (ref) => {
  let animations = [];

  // Step 1: Move right hand toward chest
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 15, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 10, "+"]);
  ref.animations.push(animations);

  // Step 2: Small circular motion on chest (clockwise)
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 12, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 12, "-"]);
  ref.animations.push(animations);

  // Step 3: Return to neutral pose
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

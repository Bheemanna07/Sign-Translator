export const SORRY = (ref) => {
  let animations = [];

  // --- Step 1: Move right arm forward toward chest ---
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 15, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 2.2, "+"]);
  ref.animations.push(animations);

  // --- Step 2: Small circular motion with right arm (hand moves slightly) ---
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 25, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "y", -Math.PI / 25, "-"]);
  ref.animations.push(animations);

  // --- Step 3: Reset to default position ---
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  // --- Step 4: Start animation safely ---
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  } else {
    // Safety check to prevent freeze
    if (ref.animations.length === 0) {
      ref.pending = false;
      ref.animate();
    }
  }
};

export const HAPPY = (ref) => {
  let animations = [];

  // --- Step 1: Raise both arms slightly (joyful motion) ---
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigHead", "rotation", "x", -Math.PI / 12, "-"]);
  ref.animations.push(animations);

  // --- Step 2: Gentle spine bounce (happy movement) ---
  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", Math.PI / 40, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigSpine", "rotation", "x", 0, "-"]);
  ref.animations.push(animations);

  // --- Step 3: Reset all parts smoothly to default pose ---
  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigHead", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  // ✅ Step 4: Ensure it never gets stuck
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  } else {
    // force unlock if somehow already running
    if (ref.animations.length === 0) {
      ref.pending = false;
      ref.animate();
    }
  }
};

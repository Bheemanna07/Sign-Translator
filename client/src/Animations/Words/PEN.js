export const PEN = (ref) => {
  let animations = [];

  // --- Step 1: Bring left hand flat like a sheet of paper ---
  animations.push(["mixamorigLeftArm", "rotation", "x", -Math.PI / 6, "-"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", -Math.PI / 8, "-"]);

  // --- Step 2: Move right arm forward to write on left palm ---
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI / 5, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "y", Math.PI / 10, "+"]);
  ref.animations.push(animations);

  // --- Step 3: Small wrist writing motion (right hand) ---
  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "z", Math.PI / 10, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "z", -Math.PI / 10, "-"]);
  ref.animations.push(animations);

  // --- Step 4: Reset all parts ---
  animations = [];
  animations.push(["mixamorigLeftArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigLeftHand", "rotation", "y", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "y", 0, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "z", 0, "+"]);
  ref.animations.push(animations);

  // --- Step 5: Safety reset to prevent freezing ---
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  } else {
    if (ref.animations.length === 0) {
      ref.pending = false;
      ref.animate();
    }
  }
};

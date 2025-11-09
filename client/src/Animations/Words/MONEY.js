export const MONEY = (ref) => {
  let animations = [];

  // Thumb rubs fingers (money gesture)
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/6, "+"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", Math.PI/10, "+"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", Math.PI/10, "+"]);
  ref.animations.push(animations);

  // Repeat slight rub
  animations = [];
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);
  animations = [];
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigRightHandThumb1", "rotation", "x", 0, "-"]);
  animations.push(["mixamorigRightHandIndex1", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightHandMiddle1", "rotation", "z", 0, "-"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

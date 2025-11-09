export const NO = (ref) => {
  let animations = [];

  // Shake head side to side
  animations.push(["mixamorigNeck", "rotation", "y", Math.PI/10, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigNeck", "rotation", "y", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigNeck", "rotation", "y", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

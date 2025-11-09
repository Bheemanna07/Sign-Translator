export const YES = (ref) => {
  let animations = [];

  // Nod head (yes gesture)
  animations.push(["mixamorigNeck", "rotation", "x", Math.PI/10, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigNeck", "rotation", "x", -Math.PI/10, "-"]);
  ref.animations.push(animations);

  // Reset
  animations = [];
  animations.push(["mixamorigNeck", "rotation", "x", 0, "+"]);
  ref.animations.push(animations);

  if (!ref.pending) { ref.pending = true; ref.animate(); }
};

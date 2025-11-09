export const HELLO = (ref) => {
  console.log('HELLO animation function called');
  let animations = [];

  animations.push(["mixamorigRightArm", "rotation", "z", Math.PI/3, "+"]);
  animations.push(["mixamorigRightArm", "rotation", "x", -Math.PI/6, "-"]);
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/4, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", -Math.PI/6, "-"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightHand", "rotation", "y", Math.PI/6, "+"]);
  ref.animations.push(animations);

  animations = [];
  animations.push(["mixamorigRightArm", "rotation", "z", 0, "-"]);
  animations.push(["mixamorigRightArm", "rotation", "x", 0, "+"]);
  animations.push(["mixamorigRightHand", "rotation", "y", 0, "-"]);
  ref.animations.push(animations);

  console.log('HELLO animations added, total animations:', ref.animations.length);
  if (!ref.pending) {
    console.log('Starting animation loop');
    ref.pending = true;
    ref.animate();
  }
};

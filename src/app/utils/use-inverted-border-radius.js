import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Avoid the stretch/squashing of border radius by using inverting them
 * throughout the component's layout transition.
 *
 * It would be possible to animate to/from different radius, for instance
 * in mobile mode from rounded to square for full-screen panels, by passing
 * the calculated inverted transform to `layoutTransition` when set as a function.
 *
 * Those inverted scales could be provided here to act as a `from` value,
 * then we can use Popcorn's `mix` function to get our
 *
 * @param radius
 */
export function useInvertedBorderRadius(radius) {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const invertedX = useTransform(scaleX, (s) => 1 / s);
  const invertedY = useTransform(scaleY, (s) => 1 / s);
  const borderRadius = useMotionValue(`${radius}px`);

  useEffect(() => {
    function updateRadius() {
      const latestX = invertedX.get();
      const latestY = invertedY.get();
      const xRadius = latestX * radius + "px";
      const yRadius = latestY * radius + "px";

      borderRadius.set(`${xRadius} ${yRadius}`);
    }

    const unsubScaleX = invertedX.on("change", updateRadius);
    const unsubScaleY = invertedY.on("change", updateRadius);

    return () => {
      unsubScaleX();
      unsubScaleY();
    };
  }, [radius]);

  return {
    scaleX,
    scaleY,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  };
}

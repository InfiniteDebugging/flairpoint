import React from "react";
import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "./particles.json";

const ParticlesBackground = () => {
  const options = useMemo(() => {
    return particlesOptions;
  }, []);
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="fixed top-0 bottom-0 right-0 left-0 -z-10"
    />
  );
};

export default ParticlesBackground;

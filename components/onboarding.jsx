import React, { useCallback, useEffect, useRef, useState } from "react";
import { Onboarding } from "../onboarding";

const OnboardingComponent = ({
  showZoomies = false,
  showGlobe = true,
  className,
}) => {
  const refBody = useRef(null);
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState();

  const handleWindowResize = useCallback(() => {
    const { current: container } = refBody;

    if (container && renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;
      console.log("window resize");
      renderer.setSize(scW, scH);
      camera.aspect = scW / scH;
      camera.updateProjectionMatrix();
    }
  }, [renderer, camera]);

  useEffect(() => {
    const { current: container } = refBody;

    if (container && !renderer) {
      const onboarding = Onboarding.newInstanceOf(container, showZoomies, showGlobe);
      setRenderer(onboarding.renderer);
      setCamera(onboarding.camera);
      setLoading(false);

      window.onboarding = onboarding;
      onboarding.play();

      return () => {
        console.log(onboarding.renderer.info);
        onboarding.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <>
      <div ref={refBody} className={`globe-app ${className}`}>
        {loading && <p>loading...</p>}
      </div>
    </>
  );
};

export default OnboardingComponent;

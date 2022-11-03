import React, { useCallback, useEffect, useRef, useState } from "react";
import { Globe } from "../globe";

const GlobeComponent = ({
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

      renderer.setSize(scW, scH);
      camera.aspect = scW / scH;
      camera.updateProjectionMatrix();
    }
  }, [renderer]);

  useEffect(() => {
    const { current: container } = refBody;

    if (container && !renderer) {
      console.log("initialize globe animation");
      const globe = Globe.newInstanceOf(container, showZoomies, showGlobe);
      setRenderer(globe.renderer);
      setCamera(globe.camera);
      setLoading(false);

      globe.play();

      // return () => {
      //   globe.dispose();
      // };
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

export default GlobeComponent;

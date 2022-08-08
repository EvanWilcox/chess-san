import React, { useRef, useState, useEffect } from "react";

import { Chessground } from "chessground";
import { Api } from "chessground/api";
import { Config } from "chessground/config";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

interface Props {
  config: Partial<Config>;
}

/**
 * Represents a Chessground Board.
 * @param {Config} config Config to be passed to the chessground object.
 * @returns {JSX.Element}
 */

function ChessGround({ config = {} }: Props): JSX.Element {
  const [api, setApi] = useState<Api | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const chessgroundApi = Chessground(ref.current, { ...config });
      setApi(chessgroundApi);
    }
  }, []);

  useEffect(() => {
    api?.set(config);
  }, [config]);

  return <div ref={ref} style={{ height: 0, width: "100%", paddingBottom: "100%", margin: "auto" }} />;
}

export default ChessGround;

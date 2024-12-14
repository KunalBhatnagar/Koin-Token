import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Faucet(props) {
  const [disable, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authneticatedCanister = createActor(canisterId,{
      agentOptions : {
        identity,
      },
    });

    const result = await authneticatedCanister.payOut();
    setText(result);
    // setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 Koin tokens to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {disable}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

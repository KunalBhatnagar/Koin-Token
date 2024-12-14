import React, { useState } from "react";
import {Principal} from "@dfinity/principal"
import { token } from "../../../declarations/token";

function Transfer() {

  const [r, setr] = useState("");
  const [amount, setamount] = useState("");
  const [isdisable, setisDisable] = useState(false);
  const [ishidden, sethidden] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  async function handleClick() {
    sethidden(true);
    setisDisable(true);
    const recipient = Principal.fromText(r);
    const amountToTranfer = Number(amount);

    const result = await token.transfer(recipient,amountToTranfer);
    setFeedback(result);
    sethidden(false);
    setisDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={r}
                onChange={(e) => {
                  setr(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) =>{
                  setamount(e.target.value)
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick}  disabled={isdisable}>
            Transfer
          </button>
        </p>
        <p hidden = {ishidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;

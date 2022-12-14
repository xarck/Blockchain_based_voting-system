import React from "react";
import { Input, Label } from "reactstrap";

export default function ShowCandidateDetails(winner) {
    // console.log(winner[0]);
    return (
        <div id="candidate-details">
            <img src="" alt="" />
            <Label>Name</Label>
            <Input type="text" defaultValue={winner[0]} />
            <Label>Description</Label>
            <Input type="textarea" value={winner[1]} />
        </div>
    );
}

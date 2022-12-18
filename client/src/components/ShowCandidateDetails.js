import React from "react";
import { Input, Label } from "reactstrap";

export default function ShowCandidateDetails(winner) {
    return (
        <div id="candidate-details">
            <img src="" alt="" />
            <Label>Name</Label>
            <Input type="text" defaultValue={winner[0]} />
            <Label>Description</Label>
            <Input type="textarea" defaultValue={winner[1]} />
            <Label>Votes</Label>
            <Input type="number" defaultValue={winner[3]} />
        </div>
    );
}

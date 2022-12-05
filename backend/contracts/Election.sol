// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Election {

    // Election Variables
    bool status;
    uint8 numCandidates;
    uint8 numVoters;    
    address chairman;


    struct Candidate {
        string candidate_name;
        string candidate_description;
        string imgHash;
        uint8 voteCount;
        string email;
    }

    //candidate mapping

    mapping(uint8=>Candidate) public candidates;

    //voter election_description

    struct Voter {
        uint8 candidate_id_voted;
        bool voted;
    }

    //voter mapping

    mapping(string=>Voter) voters;

    // Constructor

    constructor(){
        chairman = msg.sender;
    }


    // function add a candidate

    function addCandidate(string memory name, string memory description,string memory imgHash,string memory email) public{
        require(chairman == msg.sender,"Only Chairman can add a candidate");
        candidates[numCandidates].candidate_name = name;
        candidates[numCandidates].candidate_description = description;
        candidates[numCandidates].imgHash = imgHash;
        candidates[numCandidates].email = email;
        candidates[numCandidates].voteCount = 0;
        numCandidates++;
    }

    //function to vote and check for double voting

    function vote(uint8 candidateID,string memory e) public {

        //if false the vote will be registered
        require(!voters[e].voted, "Error:You cannot double vote");
        voters[e] = Voter(candidateID,true); 
        numVoters++;
        candidates[candidateID].voteCount++; 
    }

    //function to get count of candidates

    function getNumOfCandidates() public view returns(uint8) {
        return numCandidates;
    }


    function getNumOfVoters() public view returns(uint8) {
        return numVoters;
    }


    function getCandidate(uint8 candidateID) public view returns (string memory, string memory, string memory, uint8,string memory) {
        return (candidates[candidateID].candidate_name, candidates[candidateID].candidate_description, candidates[candidateID].imgHash, candidates[candidateID].voteCount, candidates[candidateID].email);
    } 

    function winnerCandidate() public view returns (uint8) {
        uint8 largestVotes = candidates[0].voteCount;
        uint8 candidateID;
        for(uint8 i = 1;i<numCandidates;i++) {
            if(largestVotes < candidates[i].voteCount) {
                largestVotes = candidates[i].voteCount;
                candidateID = i;
            }
        }
        return (candidateID);
    }
    
}
'use strict';

const { Contract } = require('fabric-contract-api');

class AccessControlContract extends Contract {

    async instantiate(ctx) {
        console.log('Access Control Chaincode Instantiated');
    }

    async addSubject(ctx, subjectID, attributes) {
        // Logic to add a subject with specified attributes
        await ctx.stub.putState(subjectID, Buffer.from(JSON.stringify(attributes)));
        console.log(`Subject ${subjectID} added with attributes:`, attributes);
    }

    async addObject(ctx, objectID, attributes) {
        // Logic to add an object with specified attributes
        await ctx.stub.putState(objectID, Buffer.from(JSON.stringify(attributes)));
        console.log(`Object ${objectID} added with attributes:`, attributes);
    }

    async addRule(ctx, ruleID, ruleDetails) {
        // Logic to add a rule with specified details
        await ctx.stub.putState(ruleID, Buffer.from(JSON.stringify(ruleDetails)));
        console.log(`Rule ${ruleID} added with details:`, ruleDetails);
    }

    async processAccessRequest(ctx, subjectID, objectID) {
        // Logic to process an access request and return access decision
        const subjectAttributes = JSON.parse(await ctx.stub.getState(subjectID));
        const objectAttributes = JSON.parse(await ctx.stub.getState(objectID));
        
        // Example logic: if subject has 'role' attribute equal to 'admin', grant access
        if (subjectAttributes.role === 'admin') {
            console.log(`Access granted to subject ${subjectID} for object ${objectID}`);
            return true;
        } else {
            console.log(`Access denied to subject ${subjectID} for object ${objectID}`);
            return false;
        }
    }

    async updateSubject(ctx, subjectID, updatedAttributes) {
        // Logic to update attributes of an existing subject
        const existingAttributes = JSON.parse(await ctx.stub.getState(subjectID));
        const updatedSubject = { ...existingAttributes, ...updatedAttributes };
        await ctx.stub.putState(subjectID, Buffer.from(JSON.stringify(updatedSubject)));
        console.log(`Attributes of subject ${subjectID} updated:`, updatedAttributes);
    }

    async updateObject(ctx, objectID, updatedAttributes) {
        // Logic to update attributes of an existing object
        const existingAttributes = JSON.parse(await ctx.stub.getState(objectID));
        const updatedObject = { ...existingAttributes, ...updatedAttributes };
        await ctx.stub.putState(objectID, Buffer.from(JSON.stringify(updatedObject)));
        console.log(`Attributes of object ${objectID} updated:`, updatedAttributes);
    }

    async deleteSubject(ctx, subjectID) {
        // Logic to delete an existing subject
        await ctx.stub.deleteState(subjectID);
        console.log(`Subject ${subjectID} deleted`);
    }

    async deleteObject(ctx, objectID) {
        // Logic to delete an existing object
        await ctx.stub.deleteState(objectID);
        console.log(`Object ${objectID} deleted`);
    }

    async deleteRule(ctx, ruleID) {
        // Logic to delete an existing rule
        await ctx.stub.deleteState(ruleID);
        console.log(`Rule ${ruleID} deleted`);
    }

}

module.exports = AccessControlContract;

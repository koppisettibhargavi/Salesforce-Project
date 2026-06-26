({
    doInit : function(component, event, helper) {
        const pageRef = component.get("v.pageReference");

        if (pageRef) {
            let objectApiName = pageRef.attributes.objectApiName;

            // ✅ Try both places
            let recordId = pageRef.state.recordId || component.get("v.recordId");

            let recordTypeId = pageRef.state.recordTypeId;

            component.set("v.objectApiName", objectApiName);
            component.set("v.recordId", recordId || null);
            component.set("v.recordTypeId", recordTypeId || null);

            console.log('FINAL recordId:', recordId);
            console.log('objectApiName:', objectApiName);
        }
    }
})
/*({
    init : function(component, event, helper) {

        const pageRef = component.get("v.pageReference");
        console.log(pageRef);

        // recordId (Override + fallback handled by force:hasRecordId)
        component.set(
            "v.recordId",
            pageRef && pageRef.attributes && pageRef.attributes.recordId
                ? pageRef.attributes.recordId
                : component.get("v.recordId")
        );

        // objectApiName
        component.set(
            "v.sObjectName",
            pageRef && pageRef.attributes && pageRef.attributes.objectApiName
                ? pageRef.attributes.objectApiName
                : component.get("v.sObjectName")
        );

        // recordTypeId (New only)
        component.set(
            "v.recordTypeId",
            pageRef && pageRef.state ? pageRef.state.recordTypeId : null
        );
    }
})*/
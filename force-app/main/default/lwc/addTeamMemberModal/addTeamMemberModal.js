import LightningModal from 'lightning/modal';
import { api, track } from 'lwc';

export default class AddTeamMemberModal extends LightningModal {
    // 1. Inputs sent directly from the parent component
    @api userName = '';
    @api initiativeName = '';

    // 2. Tracked variable form states
    @track disciplineValue = '';
    @track allocationPercentage = 0;

    // 3. Dropdown Menu Item Arrays
    get disciplineOptions() {
        return [
            { label: 'Engineering', value: 'Engineering' },
            { label: 'Design', value: 'Design' },
            { label: 'Project Management', value: 'Project Management' },
            { label: 'Quality Assurance', value: 'QA' }
        ];
    }

    // 4. Form Value Track Closures
    handleDisciplineChange(event) {
        this.disciplineValue = event.detail.value;
    }

    handleAllocationChange(event) {
        this.allocationPercentage = event.target.value;
    }

    // 5. Dismiss Backdrop (Closes without returning actions)
    handleCancel() {
        this.close();
    }

    // 6. Action Submission Payload Pipeline
    handleSave() {
        // Run simple validation checklist before dispatching records
        if (!this.disciplineValue) {
            console.error('Validation Failure: Missing required discipline choice field entry.');
            return;
        }

        const resultPayload = {
            discipline: this.disciplineValue,
            allocation: this.allocationPercentage
        };
        
        // Closes the modal popup window panel and passes the data map back up to the parent component
        this.close(resultPayload);
    }
}
